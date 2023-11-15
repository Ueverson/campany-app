import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Notification from '../components/Notification';
import { listarCargo } from '../service/CargoService';
import { cadastrarColaborador } from '../service/ColaboradorService';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import HeaderEmpresa from '../components/HeaderEmpresa';
import { useNavigation } from '@react-navigation/native';
import cadastrarColaboradorStyles from './css/cadastrarColaboradorStyles';

interface Cargo {
  fun_id: number;
  fun_nome: string;
  fun_status: string;
}

interface Colaborador {
  col_nome: string;
  col_email: string;
  col_senha: string;
  fun_id: number;
  col_confirma_senha: string;
}

function CadastrarColaborador() {
  const [showNotification, setNotification] = useState(false);
  const [listaCargos, setCargos] = useState<Cargo[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [colaborador, setColaborador] = useState<Colaborador>({
    col_nome: '',
    col_email: '',
    col_senha: '',
    fun_id: 0,
    col_confirma_senha: '',
  });

  const navigation = useNavigation<any>();

  useEffect(() => {
    async function fetchCargos() {
      const data = await listarCargo();
      setCargos(data);
    }

    fetchCargos();
  }, []);

  function limparFormulario() {
    setColaborador({
      col_nome: '',
      col_email: '',
      col_senha: '',
      fun_id: 0,
      col_confirma_senha: '',
    });
  }

  function directTo(tipo: string) {
    tipo === 'CONFIRMAR' ? setNotification(false) : setShowSuccessMessage(false);
    navigation.navigate('cadastrar-colaborador')
  }

  async function notificationPopUp() {
    if (colaborador.col_senha === colaborador.col_confirma_senha) {
      if (await cadastrarColaborador(colaborador)) {
        setShowSuccessMessage(true);
        limparFormulario();
      }
    }
  }

  return (
    <View style={cadastrarColaboradorStyles.container}>
      <ScrollView contentContainerStyle={cadastrarColaboradorStyles.contentContainer}>
        <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="white" />} to="home" />
        <Text style={cadastrarColaboradorStyles.pageTitle}>Cadastrar colaborador</Text>
        <Text style={cadastrarColaboradorStyles.pageSubtitle}>
          Para realizar o cadastro de um colaborador, preencha as informações abaixo.
        </Text>
        <TextInput
          style={cadastrarColaboradorStyles.input}
          placeholder="Nome completo"
          value={colaborador.col_nome}
          onChangeText={(text) => setColaborador({ ...colaborador, col_nome: text })}
        />
        <TextInput
          style={cadastrarColaboradorStyles.input}
          placeholder="E-mail"
          value={colaborador.col_email}
          onChangeText={(text) => setColaborador({ ...colaborador, col_email: text })}
        />
        <TextInput
          style={cadastrarColaboradorStyles.input}
          placeholder="Senha"
          secureTextEntry
          value={colaborador.col_senha}
          onChangeText={(text) => setColaborador({ ...colaborador, col_senha: text })}
        />
        <TextInput
          style={cadastrarColaboradorStyles.input}
          placeholder="Confirmar senha"
          secureTextEntry
          value={colaborador.col_confirma_senha}
          onChangeText={(text) => setColaborador({ ...colaborador, col_confirma_senha: text })}
        />
        <Text style={{ fontSize: 20, color: 'white' }}>Escolha um cargo:</Text>
        <Picker
          style={cadastrarColaboradorStyles.picker}
          selectedValue={colaborador.fun_id}
          onValueChange={(itemValue: any, itemIndex: any) => setColaborador({ ...colaborador, fun_id: itemValue })}
        >
          <Picker.Item label="Selecione" value={0} style={{ color: 'black' }} />
          {listaCargos
            .filter((cargo) => cargo.fun_status.trim() === 'S')
            .map((cargo) => (
              <Picker.Item
                key={cargo.fun_id}
                label={cargo.fun_nome}
                value={cargo.fun_id}
                style={{ color: 'black' }}
              />
            ))}
        </Picker>

        <TouchableOpacity
          onPress={() => { setNotification(true) }}
          style={cadastrarColaboradorStyles.buttonContainer}
        >
          <Text style={cadastrarColaboradorStyles.buttonText}>
            Cadastrar
          </Text>
        </TouchableOpacity>
        <Notification
          directTo={() => { directTo('CONFIRMAR') }}
          buttonText="Cadastrar"
          title="Deseja cadastrar colaborador?"
          icon={<Ionicons name="md-help-circle" size={54} color="white" />}
          description="Ao cadastrar, ele irá receber o cargo associado podendo ser modificado."
          isModalVisible={showNotification}
          buttonAction={() => {
            setNotification(false);
            notificationPopUp();
          }}
        />

        <Notification
          directTo={() => { directTo('OK') }}
          buttonText="OK"
          title="Colaborador cadastrado com sucesso"
          icon={<Ionicons name="md-checkmark-circle" size={54} color="green" />}
          description="O colaborador foi cadastrado com sucesso."
          isModalVisible={showSuccessMessage}
          buttonAction={() => { setShowSuccessMessage(false) }}
        />

      </ScrollView>
    </View>
  );
}

export default CadastrarColaborador;
