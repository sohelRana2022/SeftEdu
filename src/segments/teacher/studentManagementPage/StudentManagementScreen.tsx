import { View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import styles from '../../../styles/Styles';

const StudentManagementScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        স্টুডেন্ট ম্যানেজমেন্ট
      </Text>
    </View>
  );
};

export default StudentManagementScreen;
