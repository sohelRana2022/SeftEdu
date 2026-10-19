import { View } from 'react-native';
import React from 'react';
import { Text, Card } from 'react-native-paper';
import styles from '../../../styles/Styles';

const TeacherHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            টিচার হোম পেইজ
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default TeacherHomeScreen;
