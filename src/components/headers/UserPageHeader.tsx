import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { IMG_API } from '../../lib/configs/apiUrl';
import { THEME } from '../../lib/configs/Theme';
import LogoutButton from '../Buttons/LogoutButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

type UserHomeHeaderProps = {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
  options?: {};
  back?: () => void;
  backgroundColor: string;
};

const UserHomeHeader = ({
  navigation,
  route,
  backgroundColor = '#0B2447',
}: UserHomeHeaderProps) => {
  const { user } = useAuth();
  console.log(user);
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <View style={styles.headerLeft}>
          <Image
            source={{
              uri: IMG_API + '1nCUYNVI0ig3QQsRXr8HxzhHJPRbZulfb',
            }}
            width={70}
            height={70}
            style={{ borderRadius: 50 }}
          />
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.userSchoolNameText}>{'শাহীন স্কুল'}</Text>
            <Text style={styles.userBranch}>{user?.sef_branch + ' শাখা'}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Image
            source={{
              uri: IMG_API + user?.image_id,
            }}
            width={42}
            height={42}
            style={{ borderRadius: 50 }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}
          >
            <Text style={styles.userRole}>{user?.user_title}</Text>
            <LogoutButton navigation={navigation} route={route} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserHomeHeader;

const styles = StyleSheet.create({
  container: {
    minHeight: 120,
    paddingTop: 40,
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '65%',
    paddingLeft: 20,
  },
  headerRight: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
  },
  userSchoolNameText: {
    color: THEME.TEXTCOLORPRIMARY,
    fontSize: 22,
    fontFamily: THEME.HindSiliguriFont.BOLD,
    lineHeight: 35,
  },
  userBranch: {
    color: THEME.TEXTCOLORPRIMARY,
    fontSize: THEME.TEXTSIZESECONDARY,
    lineHeight: 20,
    fontFamily: THEME.HindSiliguriFont.SEMIBOLD,
  },
  userRole: {
    color: THEME.TEXTCOLORPRIMARY,
    fontFamily: THEME.HindSiliguriFont.REGULAR,
    fontSize: 12,
  },
});
