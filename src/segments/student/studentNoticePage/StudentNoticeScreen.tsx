import { View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import styles from '../../../styles/Styles';

const StudentNoticeScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        নোটিশ পেইজ
      </Text>
    </View>
  );
};

export default StudentNoticeScreen;
