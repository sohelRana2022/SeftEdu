import { View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import styles from '../../../styles/Styles';

const SalaryCollectionScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        হিসাব রক্ষকের হোম পেইজ
      </Text>
    </View>
  );
};

export default SalaryCollectionScreen;
