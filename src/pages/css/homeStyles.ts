import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232020', // Black-500
  },
  contentContainer: {
    margin: 20,
  },
  searchBar: {
    marginTop: 10,
    paddingBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingLeft: 8,
    paddingVertical: 12,
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default homeStyles;