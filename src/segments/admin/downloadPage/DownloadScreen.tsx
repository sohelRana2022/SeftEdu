import { View } from 'react-native';
import React from 'react';
import { Text, Card } from 'react-native-paper';
import styles from '../../../styles/Styles';

const DownloadScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        ডাউনলোড পেইজ
      </Text>
    </View>
  );
};

export default DownloadScreen;
