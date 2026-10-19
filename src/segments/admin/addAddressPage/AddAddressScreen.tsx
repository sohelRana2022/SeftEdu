import { View } from 'react-native'
import React from 'react'
import {
  Text,
  Card,
} from 'react-native-paper';
import styles from '../../../styles/Styles';

const AddAddressScreen = () => {
  return (
    <View style={styles.container}>
        <Card style={styles.card}>
            <Card.Content>
            <Text variant="headlineMedium" style={styles.title}>
                ঠিকানা যুক্ত করার পেইজ
            </Text>
            </Card.Content>
        </Card>
        </View>
    )
    }

export default AddAddressScreen