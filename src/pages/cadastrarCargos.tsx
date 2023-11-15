import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import Notification from '../components/Notification';
import { useNavigation } from '@react-navigation/native';
import HeaderEmpresa from '../components/HeaderEmpresa';
import { cadastrarCargo } from '../service/CargoService';
import cadastrarCargosStyles from './css/cadastrarCargosStyles';

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
    navigation.navigate('cadastrar-cargos');
  }

  return (
    <View style={cadastrarCargosStyles.container}>
      <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="black" />} to="home" />
      <View style={cadastrarCargosStyles.contentContainer}>
        <Text style={cadastrarCargosStyles.pageTitle}>Cadastrar cargos</Text>
        <Text style={cadastrarCargosStyles.pageSubtitle}>
          Para conceder uma permissão clique no checkbox ao lado da opção desejada.
        </Text>
        <TextInput
          style={cadastrarCargosStyles.input}
          placeholder="Nome do cargo"
          value={cargo}
          onChangeText={(text) => handleChange(text)}
        />
        <TouchableOpacity onPress={() => setNotification(true)} style={cadastrarCargosStyles.buttonContainer}>
          <Text style={cadastrarCargosStyles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        {showNotification && (
          <Notification
            directTo={() => directTo()}
            buttonText="Cadastrar"
            title="Deseja cadastrar o cargo?"
            icon={<Fontisto name="question" size={54} color="white" />}
            description="Ao criar o cargo ele será exibido na página de cargos."
            buttonAction={regiser}
            isModalVisible={showNotification}
          />
        )}
      </View>
    </View>
  );
}

export default CadastrarCargos;
