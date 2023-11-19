import { StyleSheet } from 'react-native';

const notificationStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232020',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  icon: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 4,
    color: '#F4F4F4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4F4F4',
  },
  description: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 16,
    color: '#F4F4F4',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#c2410c', // Orange-500
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default notificationStyles;
