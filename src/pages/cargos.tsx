// Cargos.js

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Notification from '../components/Notification';
import { listarCargo } from '../service/CargoService';
import { useNavigation } from '@react-navigation/native';
import HeaderEmpresa from '../components/HeaderEmpresa';
import { AntDesign, Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import cargosStyles from './css/cargosStyles';

interface Cargo {
  fun_id: number;
  fun_nome: string;
  fun_status: string;
}

function Cargos() {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [showNotificationAdd, setNotificationAdd] = useState(false);
  const [showNotificationModify, setNotificationModify] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    async function fetchCargos() {
      const data = await listarCargo();
      setCargos(data);
    }
    fetchCargos();
  }, []);

  function notificationPopUpAdd() {
    setNotificationAdd(true);
  }

  function hideNotificationAdd() {
    setNotificationAdd(false);
  }

  function notificationPopUpModify() {
    setNotificationModify(true);
  }

  function hideNotificationModify() {
    setNotificationModify(false);
  }

  function handleClick() {
    navigation.navigate('cadastrar-cargos');
  }

  function directTo(tipo: string) {
    tipo === 'ADICIONAR' ? setNotificationAdd(false) : setNotificationModify(false);
    navigation.navigate('cadastrar-colaborador');
  }

  return (
    <View style={cargosStyles.container}>
      <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="white" />} to="home" />
      <View style={cargosStyles.contentContainer}>
        <Text style={cargosStyles.pageTitle}>Cargos</Text>
        <Text style={cargosStyles.pageSubtitle}>
          Lista de todos os cargos cadastrados no sistema.
        </Text>
        <View style={cargosStyles.borderBottom} />
        <View>
          {cargos.length !== 0 ? (
            cargos.map((cargo) =>
              cargo.fun_status.trim() === 'S' ? (
                <View
                  key={cargo.fun_id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between', // Add this line
                    marginBottom: 10, // Add this line for spacing
                  }}
                >
                  <Text style={cargosStyles.cargoText}>{cargo.fun_nome}</Text>
                  <TouchableOpacity onPress={notificationPopUpModify}>
                    <Feather name="edit" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              ) : null
            )
          ) : (
            <View style={{ paddingBottom: 10 }}>
              <Text style={cargosStyles.cargoText}>Sem cargos</Text>
            </View>
          )}
        </View>
        <View style={cargosStyles.borderBottom} />
        <TouchableOpacity onPress={notificationPopUpAdd} style={cargosStyles.addCargoContainer}>
          <Entypo name="plus" size={24} color="white" />
          <Text style={cargosStyles.addCargoText}>Adicionar cargo</Text>
        </TouchableOpacity>
        {showNotificationAdd && (
          <Notification
            directTo={() => {
              directTo('ADICIONAR');
            }}
            buttonText="Adicionar"
            closePopUp={hideNotificationAdd}
            title="Adicionar cargo"
            icon={<FontAwesome name="question" size={54} color="black" />}
            description="O cargo adicionado será exibido na página de cargos."
            buttonAction={handleClick}
            isModalVisible={showNotificationAdd}
          />
        )}
        {showNotificationModify && (
          <Notification
            directTo={() => {
              directTo('MODIFICA');
            }}
            buttonText="Editar"
            closePopUp={hideNotificationModify}
            title="Editar cargo"
            icon={<FontAwesome name="question" size={54} color="black" />}
            description="As alterações desse cargo afetarão todos funcionários que recebem ele."
            buttonAction={hideNotificationModify}
            isModalVisible={showNotificationModify}
          />
        )}
      </View>
    </View>
  );
}

export default Cargos;
