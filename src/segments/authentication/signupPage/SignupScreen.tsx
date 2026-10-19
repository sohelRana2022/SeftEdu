import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UserInfoType,
  UserInfoSchema,
} from '../../../lib/schemas/signupSchema';
import { Button } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import ControlledInput from '../../../components/text_inputs/ControlledInput';
import CustomPicker from '../../../components/pickers/CustomPicker';
import Loading from '../../../components/loaders/Loading';
import { useAuth } from '../../../contexts/AuthContext';
import { branchData } from '../../../lib/jsonData/PickerData';
import type { StackNavigationProp } from '@react-navigation/stack';
interface SignUpScreenProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const SignupScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const { loading, signup } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoType>({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: {
      user_role: 'tcr',
      user_title: 'সহকারী শিক্ষক',
      related_class: 'প্লে',
      is_approved: false,
    },
  });

  const handleSingnup = async (data: UserInfoType) => {
    console.log(data);
    setLoader(true);
    try {
      // Step 1: Remove confirmPassword
      const { confirmPassword, ...rest } = data;

      // Step 2: Build data compatible with `UserfromServerType`
      const finalData = {
        ...rest,
        uid: '',
      };

      // Step 3: Call the context-based register function
      const result = await signup(finalData);
    } catch (error) {
      console.error('Signup failed:', error);
      Alert.alert('ত্রুটি', 'সাইন আপের সময় একটি সমস্যা হয়েছে!');
    } finally {
      setLoader(false);
      console.log('Successful!');
    }
  };

  return (
    <View
      style={{
        padding: 40,
        backgroundColor: '#FFF',
        flex: 1,
        justifyContent: 'center',
      }}
    >
      {loader && (
        <View style={{ position: 'absolute', top: 50, right: 50 }}>
          <Loading />
        </View>
      )}
      <View style={{ alignItems: 'center', marginVertical: 5 }}>
        <Image
          source={require('../../../assets/images/logo.gif')}
          resizeMode={'contain'}
          style={{ width: 80, height: 80, padding: 15 }}
        />
        <Text
          style={{
            color: '#111827',
            fontFamily: 'HindSiliguri-SemiBold',
            fontSize: 30,
            marginTop: 8,
          }}
        >
          ইউজার সাইন আপ
        </Text>
      </View>

      <ScrollView>
        <ControlledInput
          control={control}
          name={'user_name_eng'}
          placeholder={''}
          label={'ইংরেজি নাম'}
          style={{
            backgroundColor: '#FFF',
            fontFamily: 'HindSiliguri-SemiBold',
          }}
        />
        <ControlledInput
          control={control}
          name={'user_name_bang'}
          placeholder={''}
          label={'বাংলা নাম'}
          style={{
            backgroundColor: '#FFF',
            fontFamily: 'HindSiliguri-SemiBold',
          }}
        />

        <ControlledInput
          control={control}
          name={'contact'}
          placeholder={''}
          label={'মোবাইল'}
          style={{
            backgroundColor: '#FFF',
            fontFamily: 'HindSiliguri-SemiBold',
          }}
        />

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
          placeholder={''}
          label={'পাসওয়ার্ড'}
          secureTextEntry={true}
          style={{
            backgroundColor: '#FFF',
            fontFamily: 'HindSiliguri-SemiBold',
          }}
        />
        <ControlledInput
          control={control}
          name={'confirmPassword'}
          placeholder={''}
          label={'কনফার্ম পাসওয়ার্ড'}
          secureTextEntry={true}
          style={{
            backgroundColor: '#FFF',
            fontFamily: 'HindSiliguri-SemiBold',
          }}
        />

        <CustomPicker
          control={control}
          data={branchData}
          name={'sef_branch'}
          pickerTitle={'এসইএফ শাখা'}
        />

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <Button
            style={{ flex: 1 }}
            onPress={() => handleSubmit(handleSingnup)()}
            mode={'contained'}
          >
            সাইন আপ
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    alignItems: 'center', // Centers horizontally
    justifyContent: 'center', // Centers vertically
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
});
