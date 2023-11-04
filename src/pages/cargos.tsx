import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Notification from '../components/Notification';
import { listarCargo } from '../service/CargoService';
import { useNavigation } from '@react-navigation/native';
import HeaderEmpresa from '../components/HeaderEmpresa';
import { AntDesign, Entypo, Feather, FontAwesome } from '@expo/vector-icons';

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
    navigation.navigate('cadastrar-colaborador')
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'gray' }}>
      <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="black" />} to="home" />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30, marginBottom: 10 }}>Cargos</Text>
        <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>
          Lista de todos os cargos cadastrados no sistema.
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'grey',
            marginTop: 10,
            paddingBottom: 10,
          }}
        />
        <View style={{ paddingTop: 10 }}>
          {cargos.length !== 0 ? (
            cargos.map((cargo) =>
              cargo.fun_status.trim() === 'S' ? (
                <View key={cargo.fun_id} style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                  <TouchableOpacity
                    onPress={notificationPopUpModify}
                    style={{ position: 'absolute', right: 0 }}
                  >
                    <Feather name="edit" size={24} color="black" />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold' }}>{cargo.fun_nome}</Text>
                </View>
              ) : null
            )
          ) : (
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Sem cargos</Text>
            </View>
          )}
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'grey',
            marginTop: 20,
          }}
        />
        <TouchableOpacity
          onPress={notificationPopUpAdd}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Entypo name="plus" size={24} color="black" />
          <Text style={{ color: 'green' }}>Adicionar cargo</Text>
        </TouchableOpacity>
        {showNotificationAdd && (
          <Notification
            directTo={() => {
              directTo('ADICIONAR')
            }}
            buttonText="Adicionar"
            closePopUp={hideNotificationAdd}
            title="Adicionar cargo"
            icon={<FontAwesome name="question" size={54} color="black" />}
            description="O cargo adicionado será exibido na página de cargos."
            buttonAction={handleClick}
            isModalVisible={showNotificationAdd} />
        )}
        {showNotificationModify && (
          <Notification
            directTo={() => {
              directTo('MODIFICA')
            }}
            buttonText="Editar"
            closePopUp={hideNotificationModify}
            title="Editar cargo"
            icon={<FontAwesome name="question" size={54} color="black" />}
            description="As alterações desse cargo afetarão todos funcionários que recebem ele."
            buttonAction={hideNotificationModify}
            isModalVisible={showNotificationModify} />
        )}
      </View>
    </View>
  );
}

export default Cargos;
