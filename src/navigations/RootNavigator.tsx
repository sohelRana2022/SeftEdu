import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import AuthNavigation from './AuthNavigation';
import PendingApprovalScreen from '../screens/PendingApprovalScreen';
import AdminNavigation from './AdminNavigation';
import TeacherNavigation from './TeacherNavigation';
import StudentNavigation from './StudentNavigation';
import AccountNavigation from './AccountNavigation';

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Please wait...</Text>
      </View>
    );
  }

  if (!user) {
    return <AuthNavigation />;
  }

  if (!user.is_approved) {
    return <PendingApprovalScreen />;
  }

  switch (user.user_role) {
    case 'adm':
      return <AdminNavigation />;

    case 'tcr':
      return <TeacherNavigation />;

    case 'stn':
      return <StudentNavigation />;

    case 'acn':
      return <AccountNavigation />;

    default:
      return <AuthNavigation />;
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 12,
    color: '#333333',
  },
});
