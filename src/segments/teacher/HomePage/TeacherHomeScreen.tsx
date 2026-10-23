import { View } from 'react-native';
import React from 'react';
import { Text, Card } from 'react-native-paper';
import styles from '../../../styles/Styles';
import UserPageHeader from '../../../components/headers/UserPageHeader';
import { useAuth } from '../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
type TeacherHomeScreenRouteProp = RouteProp<
  {
    TeacherHomeScreen: {
      userData: {
        sef_branch: string;
        contact: number;
        email: string;
        user_id: string;
        image_id: string;
        user_role: string;
        user_name_bang: string;
      };
    };
  },
  'TeacherHomeScreen'
>;

interface TeacherHomeScreenProps {
  navigation: StackNavigationProp<any, any>;
  route: TeacherHomeScreenRouteProp;
}

const TeacherHomeScreen: React.FC<TeacherHomeScreenProps> = ({
  navigation,
  route,
}) => {
  const { logout, user } = useAuth();
  console.log(user);
  return (
    <View style={styles.container}>
      <UserPageHeader
        navigation={navigation}
        route={route}
        backgroundColor="#024d0f"
      />
    </View>
  );
};

export default TeacherHomeScreen;
