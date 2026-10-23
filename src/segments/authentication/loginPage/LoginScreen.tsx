import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Button, Card, Snackbar, useTheme } from 'react-native-paper';
import { useAuth } from '../../../contexts/AuthContext';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import ControlledInput from '../../../components/text_inputs/ControlledInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoginInfoType,
  LoginInfoSchema,
} from '../../../lib/schemas/loginSchema';
import Loading from '../../../components/loaders/Loading';
import getLoginErrorMessage from '../../../lib/helpers/authError';

interface LoginScreenProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [statusMsg, setStatusMsg] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const theme = useTheme();
  const { login } = useAuth();

  const { control, handleSubmit } = useForm<LoginInfoType>({
    resolver: zodResolver(LoginInfoSchema),
  });

  const signin = async (data: LoginInfoType) => {
    const { email, password } = data;

    setLoader(true);
    setStatusMsg('');
    setSnackbarVisible(false);

    try {
      await login(email.trim(), password);

      console.log('Login Successful!');
    } catch (error: unknown) {
      console.log('Login Error:', error);

      const errorMsg = getLoginErrorMessage(error as any);

      setStatusMsg(errorMsg);
      setSnackbarVisible(true);
    } finally {
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      {loader && (
        <View style={styles.loaderOverlay}>
          <Loading />
          <Text style={styles.loadingText}>অপেক্ষা করুন .....!</Text>
        </View>
      )}

      <Card style={styles.card}>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/images/logo.png')}
            resizeMode="contain"
            style={styles.logo}
          />

          <Text style={styles.title}>ইউজার লগিন</Text>

          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={6000}
            style={styles.snackbar}
          >
            <Text style={styles.snackbarText}>{statusMsg}</Text>
          </Snackbar>
        </View>

        <Card.Content style={styles.content}>
          <ControlledInput
            mode="outlined"
            control={control}
            name="email"
            placeholder=""
            label="ইমেইল"
            leftIconName="mail"
            style={{
              fontFamily: 'HindSiliguri-SemiBold',
              backgroundColor: theme.colors.surface,
            }}
          />

          <ControlledInput
            mode="outlined"
            control={control}
            name="password"
            isPasswordField={true}
            placeholder=""
            leftIconName="lock"
            label="পাসওয়ার্ড"
            secureTextEntry={true}
            style={{
              fontFamily: 'HindSiliguri-SemiBold',
              backgroundColor: theme.colors.surface,
            }}
          />
        </Card.Content>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.loginButton}
            onPress={() => handleSubmit(signin)()}
            mode="contained"
            loading={loader}
            disabled={loader}
            labelStyle={styles.buttonLabel}
          >
            লগিন
          </Button>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>কোনো একাউন্ট নেই?</Text>

          <TouchableOpacity
            disabled={loader}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.signupLink}>এখানে ক্লিক করুন!</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '80%',
    maxWidth: 400,
    paddingVertical: 30,
  },

  header: {
    alignItems: 'center',
    marginVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#666',
    marginHorizontal: 20,
  },

  logo: {
    width: 60,
    height: 60,
  },

  title: {
    color: '#111827',
    fontFamily: 'HindSiliguri-SemiBold',
    fontSize: 24,
    marginTop: 8,
  },

  content: {
    gap: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },

  loginButton: {
    flex: 1,
  },

  buttonLabel: {
    fontFamily: 'HindSiliguri-SemiBold',
    fontSize: 16,
  },

  signupContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    paddingTop: 35,
  },

  signupText: {
    color: '#111827',
    fontFamily: 'HindSiliguri-Regular',
  },

  signupLink: {
    color: '#111827',
    fontFamily: 'HindSiliguri-Bold',
    borderColor: '#6B7280',
    borderBottomWidth: 1,
  },

  snackbar: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },

  snackbarText: {
    color: '#b91c1c',
    fontFamily: 'HindSiliguri-Regular',
  },

  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },

  loadingText: {
    fontSize: 16,
    fontFamily: 'HindSiliguri-Regular',
    color: '#FFF',
    paddingTop: 20,
  },
});
