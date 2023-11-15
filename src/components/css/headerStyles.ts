import { StyleSheet } from 'react-native';

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  iconContainer: {
    marginRight: 10,
    paddingLeft: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: '#c2410c', // Orange-500
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default headerStyles;