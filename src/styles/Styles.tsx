import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    color: '#4527A0',
    fontFamily: 'HindSiliguri-Regular',
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#616161',
    fontFamily: 'HindSiliguri-Regular',
  },
  button: {
    marginTop: 12,
    borderRadius: 8,
  },
});

export default styles;
