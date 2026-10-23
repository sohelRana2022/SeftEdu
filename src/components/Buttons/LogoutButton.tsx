import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign as Icon } from '@react-native-vector-icons/ant-design';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { THEME } from '../../lib/configs/Theme';

type LogoutButtonProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
};

const LogoutButton = ({ navigation, route }: LogoutButtonProps) => {
  const { logout } = useAuth();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      setVisible(false);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setVisible(true)}
          disabled={loading}
        >
          <Icon name="down" color="#d4d4d4" size={16} />
        </TouchableOpacity>
      </View>

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => !loading && setVisible(false)}
          dismissable={!loading}
        >
          <Dialog.Title style={{ fontFamily: THEME.HindSiliguriFont.SEMIBOLD }}>
            লগআউট নিশ্চিত করুন!
          </Dialog.Title>

          <Dialog.Content>
            <Text
              variant="bodyLarge"
              style={{ fontFamily: THEME.HindSiliguriFont.REGULAR }}
            >
              আপনি কি নিশ্চিত যে আপনি লগআউট করতে চান?
            </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={() => setVisible(false)} disabled={loading}>
              বাতিল
            </Button>

            <Button
              onPress={handleLogout}
              loading={loading}
              disabled={loading}
              textColor="#D32F2F"
            >
              লগআউট
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
});
