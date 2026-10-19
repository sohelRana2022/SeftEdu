import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Button, Card, Snackbar } from 'react-native-paper';
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

interface LoginScreenProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [statusMsg, setStatusMsg] = useState('');
  const [loader, setLoader] = useState(false);
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfoType>({
    resolver: zodResolver(LoginInfoSchema),
  });

  const signin = async (data: LoginInfoType) => {
    const { email, password } = data;
    console.log(email);
    // try {
    //   await login('sinha26@gmail.com', 'Sinha@26');
    //   console.log('Login Successful!');
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {loader && (
        <View style={styles.loaderOverlay}>
          <Loading />
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'HindSiliguri-Regular',
              color: '#FFF',
              paddingTop: 20,
            }}
          >
            অপেক্ষা করুন .....!
          </Text>
        </View>
      )}

      {statusMsg !== '' && (
        <View style={styles.snackbarWrapper}>
          <Snackbar
            visible
            onDismiss={() => setStatusMsg('')}
            duration={6000}
            style={styles.snackbar}
          >
            <Text style={{ color: 'red', fontFamily: 'HindSiliguri-Regular' }}>
              {statusMsg}
            </Text>
          </Snackbar>
        </View>
      )}
      <Card style={{ width: '80%', maxWidth: 400, paddingVertical: 30 }}>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 5,
            borderBottomWidth: 2,
            borderBottomColor: '#666',
          }}
        >
          <Image
            source={require('../../../assets/images/logo.png')}
            resizeMode={'contain'}
            style={{ width: 80, height: 80 }}
          />
          <Text
            style={{
              color: '#111827',
              fontFamily: 'HindSiliguri-SemiBold',
              fontSize: 24,
              marginTop: 8,
            }}
          >
            ইউজার লগিন
          </Text>
        </View>
        <Card.Content style={{ gap: 5 }}>
          <ControlledInput
            control={control}
            name={'email'}
            placeholder={''}
            label={'ইমেইল'}
            style={{
              backgroundColor: '#FFF',
              fontFamily: 'HindSiliguri-SemiBold',
            }}
          />

          <ControlledInput
            control={control}
            name={'password'}
            isPasswordField={true}
            placeholder={''}
            label={'পাসওয়ার্ড'}
            secureTextEntry={true}
            style={{
              backgroundColor: '#FFF',
              fontFamily: 'HindSiliguri-SemiBold',
            }}
          />
        </Card.Content>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
            marginTop: 20,
            paddingHorizontal: 15,
          }}
        >
          <Button
            style={{ flex: 1 }}
            onPress={() => handleSubmit(signin)()}
            mode={'contained'}
          >
            লগিন
          </Button>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            paddingTop: 35,
          }}
        >
          <Text
            style={{
              color: '#111827',
              fontFamily: 'HindSiliguri-Regular',
            }}
          >
            কোনো একাউন্ট নেই?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                color: '#111827',
                fontFamily: 'HindSiliguri-Bold',
                borderColor: '#6B7280',
                borderBottomWidth: 1,
              }}
            >
              এখানে ক্লিক করুন!
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  snackbarWrapper: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  snackbar: {
    width: '80%',
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: '#fff',
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
});
