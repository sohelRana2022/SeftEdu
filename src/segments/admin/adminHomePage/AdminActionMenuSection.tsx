import React from 'react';
import { View } from 'react-native';
import { ActionMenuDataType } from '../../../lib/schemas/dashboardItemType';
import Icon from '@react-native-vector-icons/ant-design';
import { Text } from 'react-native-paper';
const ActionMenuData: ActionMenuDataType[] = [
  {
    id: 1,
    icon: 'home',
    title: 'এড ইউজার',
  },
  {
    id: 2,
    icon: 'book',
    title: 'সংগ্রসালা',
  },
];

const AdminActionMenuSection = () => {
  return (
    <View style={{ width: '100%', flexDirection: 'row', margin: 5 }}>
      {ActionMenuData.map(item => (
        <View
          key={item.id}
          style={{
            width: 80,
            height: 80,
            flexDirection: 'column',
            padding: 5,
            justifyContent: 'center',
            backgroundColor: 'rgb(11, 101, 190)',
            borderRadius: 10,
            margin: 10,
            alignItems: 'center',
          }}
        >
          <Icon name={'home'} color={'#FFF'} size={20} />
          <Text
            variant="labelMedium"
            style={{
              fontFamily: 'HindSiliguri-Regular',
              color: '#FFF',
              fontSize: 12,
            }}
          >
            {item.title}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default AdminActionMenuSection;
