import { StyleSheet } from 'react-native';

const cargosStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232020',
    },
    contentContainer: {
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
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: 'grey',
        marginTop: 10,
        paddingBottom: 10,
    },
    cargoText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
    addCargoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    addCargoText: {
        color: 'green',
        fontSize: 20
    },
});

export default cargosStyles;
