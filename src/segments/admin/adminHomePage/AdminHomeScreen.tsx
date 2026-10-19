import { View } from 'react-native';
import React from 'react';
import { Text, Card, Button } from 'react-native-paper';
import styles from '../../../styles/Styles';
import { useAuth } from '../../../contexts/AuthContext';

const AdminHomeScreen = () => {
  const { logout, user } = useAuth();
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        এডমিন হোম পেইজ
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
};

export default AdminHomeScreen;
