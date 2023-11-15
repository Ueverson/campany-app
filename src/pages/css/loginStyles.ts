import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232020',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    color: '#F4F4F4',
  },
  pageTitle: {
    fontSize: 24,
    color: '#F4F4F4',
    marginBottom: 30,
    marginTop: 30,
  },
  pageSubtitle: {
    color: '#F4F4F4',
    paddingBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
    width: 300,
    height: 40,
    color: 'black', // Text color inside input
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  loginButtonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  importantText: {
    color: '#c2410c', // Orange-500
  },
});

export default styles;