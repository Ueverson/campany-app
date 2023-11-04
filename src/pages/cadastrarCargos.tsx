import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import Notification from '../components/Notification';
import { useNavigation } from '@react-navigation/native';
import HeaderEmpresa from '../components/HeaderEmpresa';
import { cadastrarCargo } from '../service/CargoService';

function CadastrarCargos() {
    const [showNotification, setNotification] = useState(false);
    const [cargo, setCargo] = useState('');
    const navigation = useNavigation<any>();

    async function notificationPopUp() {
        if (await cadastrarCargo(cargo !== undefined ? cargo : '')) {
            limparFormulario();
        }
    }

    function limparFormulario() {
        setCargo('');
    }

    function regiser() {
        notificationPopUp();
        setNotification(false);
    }

    const handleChange = (value: any) => {
        setCargo(value);
    };

    function directTo() {
        setNotification(false);
        navigation.navigate('cadastrar-cargos')
    }

    return (
        <View style={{ backgroundColor: 'gray' }} className='h-full min-h-screen'>
            <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="black" />} to="home" />
            <View className="text-white-300 mx-5 my-4">
                <Text className="text-3xl mb-4">Cadastrar cargos</Text>
                <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>
                    Para conceder uma permissão clique no checkbox ao lado da opção desejada.
                </Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: 'black',
                        backgroundColor: 'white',
                        fontSize: 16,
                        padding: 10,
                        marginBottom: 10,
                    }}
                    placeholder="Nome do cargo"
                    value={cargo}
                    onChangeText={(text) => handleChange(text)}
                />
                <View className="flex items-center content-center justify-center pt-4" />
                <TouchableOpacity onPress={() => { setNotification(true) }} 
                    style={{
                    marginTop: 10,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 10,
                    }}>
                    <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>
                        Cadastrar
                    </Text>
                </TouchableOpacity>
                {showNotification && (
                    <Notification
                        directTo={() => { directTo() }}
                        buttonText="Cadastrar"
                        title="Deseja cadastrar o cargo?"
                        icon={<Fontisto name="question" size={54} color="white" />}
                        description="Ao criar o cargo ele será exibido na página de cargos."
                        buttonAction={regiser}
                        isModalVisible={showNotification} />
                )}
            </View>
        </View>
    );
}

export default CadastrarCargos;
