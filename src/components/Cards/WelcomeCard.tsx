import { View, useWindowDimensions } from 'react-native';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Text } from 'react-native-paper';
import { THEME } from '../../lib/configs/Theme';
import { BanglaDate } from '../../lib/helpers/dateFormat';
import Icon from '@react-native-vector-icons/ant-design';

const WelcomeCard = () => {
  const { user } = useAuth();
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        height: height * 0.1,
        width: width * 0.95,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgb(60, 8, 156)',
        margin: 10,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <View style={{ justifyContent: 'center' }}>
        <Text
          variant="headlineSmall"
          style={{
            color: '#FFF',
            fontFamily: THEME.HindSiliguriFont.BOLD,
            fontSize: 16,
          }}
        >
          {`${user?.user_name_bang}`}
        </Text>
        <Text
          variant="labelMedium"
          style={{
            color: '#FFF',
            fontFamily: THEME.HindSiliguriFont.REGULAR,
            fontSize: 14,
          }}
        >
          {`ড্যাসবোর্ডে আপনাকে স্বাগতম!`}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Icon name="calendar" color={'#ddd'} size={30} />
        <Text
          variant="labelMedium"
          style={{
            color: '#FFF',
            fontFamily: THEME.HindSiliguriFont.REGULAR,
            fontSize: 14,
            paddingTop: 5,
          }}
        >
          {BanglaDate()}
        </Text>
      </View>
    </View>
  );
};
export default WelcomeCard;
