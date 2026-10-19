import React from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@react-native-vector-icons/ant-design';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StudentHomeScreen from '../segments/student/studentHomePage/StudentHomeScreen';
import StudentNoticeScreen from '../segments/student/studentNoticePage/StudentNoticeScreen';
import StudentProfileScreen from '../segments/student/studentProfilePage/StudentProfileScreen';

const Tab = createBottomTabNavigator();

const StudentTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: styles.tabBarLabel,

        tabBarStyle: [
          styles.tabBar,
          {
            // Android system navigation bar-এর জন্য জায়গা
            height: 60 + insets.bottom,
            paddingBottom: Math.max(insets.bottom, 8),
          },
        ],

        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof AntDesign>['name'] = 'home';

          switch (route.name) {
            case 'Dashboard':
              iconName = 'home';
              break;

            case 'Users':
              iconName = 'team';
              break;

            case 'Downloads':
              iconName = 'download';
              break;

            case 'Address':
              iconName = 'environment';
              break;
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={StudentHomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />

      <Tab.Screen
        name="Users"
        component={StudentNoticeScreen}
        options={{
          tabBarLabel: 'Users',
        }}
      />

      <Tab.Screen
        name="Downloads"
        component={StudentProfileScreen}
        options={{
          tabBarLabel: 'Downloads',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E5E7EB',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 6,
    elevation: 8,
  },

  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  header: {
    minHeight: 60,
    paddingHorizontal: 16,
    paddingBottom: 12,
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
});

export default StudentTabs;
