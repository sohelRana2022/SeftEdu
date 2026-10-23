import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 50,
  },
  KeyBoardAvoidingViewContainer: {
    flex: 1,
  },
  // ScrollView occupies the available screen height
  scrollView: {
    flex: 1,
    width: '100%',
  },

  // Center all content vertically when there is enough space
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },

  header: {
    alignItems: 'center',
    paddingTop: 60,
  },

  logo: {
    width: 80,
    height: 80,
  },

  title: {
    color: '#111827',
    fontFamily: 'HindSiliguri-SemiBold',
    fontSize: 24,
    marginTop: 8,
    textAlign: 'center',
  },

  input: {
    height: 40,
    backgroundColor: '#FFF',
    fontFamily: 'HindSiliguri-SemiBold',
    marginVertical: 5,
  },

  branchLoading: {
    paddingVertical: 15,
    alignItems: 'center',
  },

  errorText: {
    color: 'red',
    marginTop: 8,
    fontSize: 13,
    fontFamily: 'HindSiliguri-Regular',
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },

  button: {
    flex: 1,
  },

  buttonLabel: {
    fontFamily: 'HindSiliguri-SemiBold',
    fontSize: 16,
  },

  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    zIndex: 100,
    elevation: 10,
  },
});
