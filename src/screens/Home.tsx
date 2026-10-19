
import React, { useEffect } from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import {
  PaperProvider,
  Text,
  Button,
  Card,
} from 'react-native-paper';
import {getFirestore, collection, addDoc, serverTimestamp} from '@react-native-firebase/firestore';


type RootStackParamList = {
  Home: undefined;
  Student: undefined;
  Admission: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();



const writeTestDoc = async () => {
  try {
    const db = getFirestore();

    const docRef = await addDoc(collection(db, 'test'), {
      message: 'Firebase write successful',
      createdAt: serverTimestamp(),
    });

    console.log('Write successful:', docRef.id);
  } catch (error) {
    console.error('Write failed:', error);
  }
};




// Home Screen
function HomeScreen() {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
          স্বাগতম আপনাকে
          </Text>

          <Text variant="bodyLarge" style={styles.description}>
            আমার হোম পেইজ
          </Text>

          <Button
            mode="contained"
            icon="bell-outline"
            style={styles.button}
            onPress={() => navigation.navigate('Admission')}>
            Go to Notification
          </Button>

          <Button
            mode="outlined"
            icon="cog-outline"
            style={styles.button}
            onPress={() => navigation.navigate('Student')}>
            Go to Settings
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

// Notification Screen
function NotificationScreen() {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Notifications
          </Text>

          <Text variant="bodyLarge" style={styles.description}>
            You are now on the Notification page.
          </Text>

          <Button
            mode="contained"
            icon="home-outline"
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            Go to Home
          </Button>

          <Button
            mode="outlined"
            icon="cog-outline"
            style={styles.button}
            onPress={() => navigation.navigate('Student')}>
            Go to Settings
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

// Settings Screen
function SettingsScreen() {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Settings
          </Text>

          <Text variant="bodyLarge" style={styles.description}>
            Manage your app settings here.
          </Text>

          <Button
            mode="contained"
            icon="home-outline"
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            Go to Home
          </Button>

          <Button
            mode="outlined"
            icon="bell-outline"
            style={styles.button}
            onPress={() => navigation.navigate('Student')}>
            Go to Notification
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

// Main App
export default function Home() {

useEffect(() => {
  writeTestDoc();
}, []);

  return (
   
 

      
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6200EE',
            },
            headerTintColor: '#FFFFFF',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            cardStyle: {
              backgroundColor: '#F5F5FA',
            },
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Home'}}
          />

          <Stack.Screen
            name="Student"
            component={NotificationScreen}
            options={{title: 'Notifications'}}
          />

          <Stack.Screen
            name="Admission"
            component={SettingsScreen}
            options={{title: 'Settings'}}
          />
        </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    color: '#4527A0',
    fontFamily:'HindSiliguri-Regular'
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#616161',
    fontFamily:'HindSiliguri-Regular'
  },
  button: {
    marginTop: 12,
    borderRadius: 8,
  },
});
