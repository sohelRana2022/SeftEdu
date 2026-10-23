import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'react-native-paper';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import {
  UserInfoType,
  UserInfoSchema,
} from '../../../lib/schemas/signupSchema';

import ControlledInput from '../../../components/text_inputs/ControlledInput';
import CustomPicker, {
  type Branch,
} from '../../../components/pickers/CustomPicker';
import Loading from '../../../components/loaders/Loading';

import { useAuth } from '../../../contexts/AuthContext';
import { styles } from './signupStyles';

interface SignUpScreenProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const SignupScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [branchData, setBranchData] = useState<Branch[]>([]);
  const [branchLoading, setBranchLoading] = useState(true);

  const { signup, getBranch } = useAuth();

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
      image_id: '1nCUYNVI0ig3QQsRXr8HxzhHJPRbZulfb',
    },
  });

  // Load branch data
  useEffect(() => {
    let isMounted = true;

    const loadBranches = async () => {
      try {
        setBranchLoading(true);

        const result = await getBranch();

        const validBranches: Branch[] = Array.isArray(result)
          ? result.filter(
              (item): item is Branch =>
                item != null &&
                typeof item.id === 'string' &&
                typeof item.label === 'string' &&
                typeof item.value === 'string',
            )
          : [];

        if (isMounted) {
          setBranchData(validBranches);
        }
      } catch (error) {
        console.error('Failed to load branches:', error);

        if (isMounted) {
          setBranchData([]);

          Alert.alert(
            'ত্রুটি',
            'শাখার তালিকা লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।',
          );
        }
      } finally {
        if (isMounted) {
          setBranchLoading(false);
        }
      }
    };

    loadBranches();

    return () => {
      isMounted = false;
    };
  }, [getBranch]);

  // Handle signup
  const handleSignup = useCallback(
    async (data: UserInfoType) => {
      if (loader) {
        return;
      }

      setLoader(true);

      try {
        const { confirmPassword, ...formData } = data;

        await signup({
          user_name_bang: formData.user_name_bang,
          user_name_eng: formData.user_name_eng,
          user_title: formData.user_title,
          image_id: formData.image_id,
          email: formData.email,
          password: formData.password,
          contact: formData.contact,
          sef_branch: formData.sef_branch,
        });

        Alert.alert(
          'সফল',
          'আপনার সাইন আপ সম্পন্ন হয়েছে। অ্যাডমিন অনুমোদনের পর অ্যাকাউন্ট ব্যবহার করতে পারবেন।',
        );
      } catch (error) {
        console.error('Signup failed:', error);

        Alert.alert(
          'সাইন আপ ব্যর্থ',
          'সাইন আপের সময় সমস্যা হয়েছে। ইমেইল আগে থেকে ব্যবহৃত হয়েছে কি না এবং ইন্টারনেট সংযোগ পরীক্ষা করুন।',
        );
      } finally {
        setLoader(false);
      }
    },
    [loader, signup],
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/logo.gif')}
          resizeMode="contain"
          style={styles.logo}
        />

        <Text style={styles.title}>ইউজার সাইন আপ</Text>
        {loader && <Loading />}
      </View>
      <KeyboardAvoidingView
        style={styles.KeyBoardAvoidingViewContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* English Name */}
          <ControlledInput
            mode="outlined"
            control={control}
            name="user_name_eng"
            placeholder=""
            label="English Name"
            leftIconName={'user'}
            style={styles.input}
          />

          {/* Bangla Name */}
          <ControlledInput
            mode="outlined"
            control={control}
            name="user_name_bang"
            placeholder=""
            leftIconName={'user'}
            label="Bangla Name"
            style={styles.input}
          />

          {/* Mobile Number */}
          <ControlledInput
            mode="outlined"
            control={control}
            name="contact"
            leftIconName={'phone'}
            placeholder=""
            label="Contact"
            style={styles.input}
          />

          {/* Email */}
          <ControlledInput
            mode="outlined"
            control={control}
            name="email"
            placeholder=""
            label="Email"
            leftIconName={'mail'}
            style={styles.input}
          />

          {/* Password */}
          <ControlledInput
            mode="outlined"
            control={control}
            name="password"
            placeholder=""
            label="Password"
            leftIconName={'key'}
            secureTextEntry
            isPasswordField
            style={styles.input}
          />

          {/* Confirm Password */}
          <ControlledInput
            mode="outlined"
            control={control}
            name="confirmPassword"
            placeholder=""
            label="Confirm Password"
            leftIconName={'lock'}
            secureTextEntry
            isPasswordField
            style={styles.input}
          />

          {/* Branch Picker */}
          {branchLoading ? (
            <View style={styles.branchLoading}>
              <Loading />
            </View>
          ) : (
            <CustomPicker
              control={control}
              data={branchData}
              name="sef_branch"
              pickerTitle="এসইএফ শাখা"
              iconName={'environment'}
            />
          )}

          {/* Branch Loading Error */}
          {!branchLoading && branchData.length === 0 && (
            <Text style={styles.errorText}>
              কোনো শাখা পাওয়া যায়নি। পরে আবার চেষ্টা করুন।
            </Text>
          )}

          {/* Validation Error */}
          {errors.sef_branch?.message && (
            <Text style={styles.errorText}>
              {String(errors.sef_branch.message)}
            </Text>
          )}

          {/* Signup Button */}
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              labelStyle={styles.buttonLabel}
              onPress={() => handleSubmit(handleSignup)()}
              mode="contained"
              loading={loader}
              disabled={loader || branchLoading || branchData.length === 0}
            >
              সাইন আপ
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignupScreen;
