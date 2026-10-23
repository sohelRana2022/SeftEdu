import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useAuth } from '../../../contexts/AuthContext';
import UserPageHeader from '../../../components/headers/UserPageHeader';
import WelcomeCard from '../../../components/Cards/WelcomeCard';
import InfoDisplaySection from './InfoDisplaySection';
import AdminActionMenuSection from './AdminActionMenuSection';

type AdminHomeScreenRouteProp = RouteProp<
  {
    UserHomeScreen: {
      userData: {
        branch: string;
        contact: number;
        email: string;
        id: string;
        imageId: string;
        role: string;
        teaClass: string;
        userName: string;
      };
    };
  },
  'UserHomeScreen'
>;

interface AdminHomeHomeScreenProps {
  navigation: StackNavigationProp<any, any>;
  route: AdminHomeScreenRouteProp;
}

const AdminHomeScreen: React.FC<AdminHomeHomeScreenProps> = ({
  navigation,
  route,
}) => {
  const { user } = useAuth();
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <UserPageHeader
        navigation={navigation}
        route={route}
        backgroundColor="#0B2447"
      />

      {/** Welcome Section */}
      <WelcomeCard />

      {/* Dashboard Section */}
      <InfoDisplaySection />

      {/**
       * Action Menu
       */}
      <AdminActionMenuSection />
    </View>
  );
};

export default AdminHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
