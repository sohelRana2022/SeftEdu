import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';

const AdminPageHeader = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <View style={styles.headerLeft}>
          <Image
            source={{}}
            width={65}
            height={65}
            style={{ borderRadius: 50 }}
          />
          <View style={{ paddingLeft: 25 }}>
            <Text style={{}}>{'Welcome'}</Text>
            <Text style={{}}>{'Sohel Rana'}</Text>
            <Text style={{}}>{'Tarakandi'}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          {/* <LogoutButton navigation={navigation} route={route} /> */}
        </View>
      </View>
    </View>
  );
};

export default AdminPageHeader;

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    padding: 10,
    backgroundColor: '#0B2447',
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '75%',
    paddingLeft: 20,
  },
  headerRight: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
  },
});
