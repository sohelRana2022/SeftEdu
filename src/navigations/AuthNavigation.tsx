import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../segments/authentication/loginPage/LoginScreen';
import SignupScreen from '../segments/authentication/signupPage/SignupScreen';
const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
