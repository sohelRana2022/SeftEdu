import { View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import styles from '../../../styles/Styles';

const TeacherProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        টিচার প্রোফাইল
      </Text>
    </View>
  );
};

export default TeacherProfileScreen;
