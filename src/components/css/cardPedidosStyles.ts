import { StyleSheet } from 'react-native';

const cardPedidosStyles = StyleSheet.create({
  container: {
    maxWidth: 300,
    marginVertical: 10,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardContent: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mesaText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginVertical: 10,
  },
  quantityText: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
    marginRight: 10,
    marginTop:10,
  },
  itemNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  itemName: {
    fontWeight: 'bold',
    color: 'black',
  },
  checkboxContainer: {
    marginLeft: 'auto',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  prontoButton: {
    backgroundColor: 'black',
    width: 80,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prontoButtonText: {
    color: 'white',
  },
  observacoesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  observacoesText: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 10,
  },
  observacoesIcon: {
    marginRight: 2,
  }
});

export default cardPedidosStyles;