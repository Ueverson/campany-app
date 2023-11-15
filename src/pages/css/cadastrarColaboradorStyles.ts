import { StyleSheet } from 'react-native';

const cadastrarColaboradorStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232020', // Black-500
        alignItems: 'center',
    },
    contentContainer: {
        padding: 20,
        paddingTop: 30,
    },
    pageTitle: {
        fontSize: 30,
        marginTop: 20,
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
    picker: {
        color: 'black',
        height: 30,
        marginBottom: 10,
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: 20,
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

export default cadastrarColaboradorStyles;
