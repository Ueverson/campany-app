import { StyleSheet } from 'react-native';

const cadastrarCargosStyles = StyleSheet.create({
  container: {
    backgroundColor: '#232020',
    flex: 1,
    minHeight: '100%',
  },
  contentContainer: {
    backgroundColor: '#232020',
    padding: 20,
  },
  pageTitle: {
    fontSize: 30,
    marginBottom: 10,
    color: 'white',
  },
  pageSubtitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default cadastrarCargosStyles;