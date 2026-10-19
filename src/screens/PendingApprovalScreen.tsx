import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

export default function PendingApprovalScreen() {
  const { logout, user } = useAuth();

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Account Pending Approval</Text>

      <Text style={styles.message}>
        {user?.user_name_eng || 'Your account'} is waiting for admin approval.
      </Text>

      <Button
        mode="contained"
        onPress={() => {
          void logout();
        }}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  message: {
    textAlign: 'center',
  },
});
