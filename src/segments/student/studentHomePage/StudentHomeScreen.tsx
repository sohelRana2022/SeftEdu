import { View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import styles from '../../../styles/Styles';

const StudentHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        শিক্ষার্থী হোম পেইজ
      </Text>
    </View>
  );
};

export default StudentHomeScreen;
