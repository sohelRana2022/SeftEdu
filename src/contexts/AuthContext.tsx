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

export type UserRole = 'adm' | 'tcr' | 'stn' | 'acn';

export interface AppUser {
  user_id: string;
  user_name_bang: string;
  user_name_eng: string;
  user_title: string;
  user_role: UserRole;
  contact: string;
  email: string;
  is_approved: boolean;
  sef_branch: string;
}

// Signup form-এর data
export interface SignupInput {
  user_name_bang: string;
  user_name_eng: string;
  user_title: string;
  email: string;
  password: string;
  contact: string;
  sef_branch: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const auth = getAuth();
const database = getDatabase();

const validRoles: UserRole[] = ['adm', 'tcr', 'stn', 'acn'];

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

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Manual profile refresh
  const loadUser = useCallback(async (uid: string) => {
    const profile = await fetchUserProfile(uid);
    setUser(profile);
  }, []);

  const refreshUser = useCallback(async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setUser(null);
      return;
    }

    await loadUser(currentUser.uid);
  }, [loadUser]);

  // Auth change + Realtime Database live listener
  useEffect(() => {
    let active = true;
    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, firebaseUser => {
      // আগের user-এর listener বন্ধ করো
      unsubscribeProfile?.();
      unsubscribeProfile = undefined;

      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      // Database-এর পরিবর্তন স্বয়ংক্রিয়ভাবে শুনবে
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

  // Login
  const login = useCallback(
    async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());

      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error('LOGIN_FAILED');
      }

      await loadUser(currentUser.uid);
    },
    [loadUser],
  );

  // Signup + create Realtime Database profile
  const signup = useCallback(async (data: SignupInput) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      data.email.trim(),
      data.password.trim(),
    );

    const uid = credential.user.uid;

    const profile: AppUser = {
      user_id: uid,
      user_name_bang: data.user_name_bang.trim(),
      user_name_eng: data.user_name_eng.trim(),
      user_title: data.user_title.trim(),
      user_role: 'stn',
      contact: data.contact.trim(),
      email: data.email.trim(),
      is_approved: false,
      sef_branch: data.sef_branch.trim(),
    };

    await set(ref(database, `users/${uid}`), profile);

    // Listener-ও update করবে; এখানে তাৎক্ষণিক state update
    setUser(profile);
  }, []);

  // Logout
  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
