import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';

import {
  getDatabase,
  ref,
  get,
  set,
  onValue,
} from '@react-native-firebase/database';

// ==================== Types ====================

export type UserRole = 'adm' | 'tcr' | 'stn' | 'acn';

export interface AppUser {
  user_id: string;
  user_name_bang: string;
  user_name_eng: string;
  image_id: string;
  user_title: string;
  user_role: UserRole;
  contact: string;
  email: string;
  is_approved: boolean;
  sef_branch: string;
}

export interface SignupInput {
  user_name_bang: string;
  user_name_eng: string;
  user_title: string;
  email: string;
  password: string;
  contact: string;
  sef_branch: string;
  image_id: string;
}

export interface Branch {
  id: string;
  label: string;
  value: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  getBranch: () => Promise<Branch[]>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// ==================== Context ====================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const auth = getAuth();
const database = getDatabase();

const validRoles: UserRole[] = ['adm', 'tcr', 'stn', 'acn'];

// ==================== Helpers ====================

function isApproved(value: unknown): boolean {
  return value === true || value === 1 || value === 'true';
}

function parseUserProfile(uid: string, data: any): AppUser {
  if (!data || !validRoles.includes(data.user_role)) {
    throw new Error('INVALID_USER_ROLE');
  }

  return {
    user_id: data.user_id ?? uid,
    user_name_bang: data.user_name_bang ?? '',
    user_name_eng: data.user_name_eng ?? '',
    image_id: data.image_id ?? '',
    user_title: data.user_title ?? '',
    user_role: data.user_role as UserRole,
    contact: data.contact ?? '',
    email: data.email ?? auth.currentUser?.email ?? '',
    is_approved: isApproved(data.is_approved),
    sef_branch: data.sef_branch ?? '',
  };
}

async function fetchUserProfile(uid: string): Promise<AppUser> {
  const snapshot = await get(ref(database, `users/${uid}`));

  if (!snapshot.exists()) {
    throw new Error('USER_PROFILE_NOT_FOUND');
  }

  return parseUserProfile(uid, snapshot.val());
}

// ==================== AuthContext Provider ====================

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user profile
  const loadUser = useCallback(async (uid: string) => {
    const profile = await fetchUserProfile(uid);
    setUser(profile);
  }, []);

  // Refresh current user
  const refreshUser = useCallback(async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setUser(null);
      return;
    }

    await loadUser(currentUser.uid);
  }, [loadUser]);

  // Firebase Auth state + realtime profile listener
  useEffect(() => {
    let active = true;
    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, firebaseUser => {
      unsubscribeProfile?.();
      unsubscribeProfile = undefined;

      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      unsubscribeProfile = onValue(
        ref(database, `users/${firebaseUser.uid}`),
        snapshot => {
          if (!active) {
            return;
          }

          try {
            if (!snapshot.exists()) {
              setUser(null);
            } else {
              const profile = parseUserProfile(
                firebaseUser.uid,
                snapshot.val(),
              );

              setUser(profile);
            }
          } catch (error) {
            console.error('Invalid user profile:', error);
            setUser(null);
          } finally {
            setLoading(false);
          }
        },
        error => {
          if (!active) {
            return;
          }

          console.error('User profile listener failed:', error);
          setUser(null);
          setLoading(false);
        },
      );
    });

    return () => {
      active = false;
      unsubscribeAuth();
      unsubscribeProfile?.();
    };
  }, []);

  // ==================== Login ====================

  const login = useCallback(
    async (email: string, password: string) => {
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      await loadUser(credential.user.uid);
    },
    [loadUser],
  );

  // ==================== Signup ====================

  const signup = useCallback(async (input: SignupInput) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      input.email.trim(),
      input.password,
    );

    const uid = credential.user.uid;

    const profile: AppUser = {
      user_id: uid,
      user_name_bang: input.user_name_bang.trim(),
      user_name_eng: input.user_name_eng.trim(),
      user_title: input.user_title.trim(),
      user_role: 'stn',
      contact: input.contact.trim(),
      email: input.email.trim(),
      is_approved: false,
      sef_branch: input.sef_branch.trim(),
      image_id: input.image_id.trim(),
    };

    await set(ref(database, `users/${input.contact.trim()}`), profile);

    setUser(profile);
  }, []);

  // ==================== Logout ====================

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
  }, []);

  // ==================== Get Branches ====================

  const getBranch = useCallback(async (): Promise<Branch[]> => {
    const snapshot = await get(ref(database, 'sef_branches'));

    if (!snapshot.exists()) {
      return [];
    }

    const branches: Branch[] = [];

    snapshot.forEach(childSnapshot => {
      const data = childSnapshot.val();

      // Ignore null or invalid branch records
      if (
        data &&
        typeof data.label === 'string' &&
        typeof data.value === 'string'
      ) {
        branches.push({
          id: childSnapshot.key ?? data.value,
          label: data.label,
          value: data.value,
        });
      }
    });

    return branches;
  }, []);

  // ==================== Provider ====================

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        refreshUser,
        getBranch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ==================== Custom Hook ====================

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
