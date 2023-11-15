import { StyleSheet } from 'react-native';

const qrcodeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232020',
    },
    contentContainer: {
        padding: 20,
    },
    textWhite: {
        color: 'white',
    },
    pageTitle: {
        fontSize: 18,
        paddingTop: 5,
        textAlign: 'center',
    },
    pageSubtitle: {
        paddingTop: 5,
        marginTop: 10,
        fontSize: 18,
        width: '100%',
        textAlign: 'center',
        color: 'white',
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: 'grey',
        marginTop: 10,
    },
    picker: {
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        color: 'black',
        fontSize: 20,
    },
    generateButton: {
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
    },
});

export default qrcodeStyles;
