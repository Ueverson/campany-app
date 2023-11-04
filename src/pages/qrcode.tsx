import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import HeaderEmpresa from '../components/HeaderEmpresa';
import Notification from '../components/Notification';
import { useNavigation } from '@react-navigation/native';
import { listarMesas } from '../service/MesaService';
import { criarCliente } from '../service/ClienteService';
import { QRCodeContext } from '../service/ContextService';
import { Picker } from '@react-native-picker/picker';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

interface mesa {
  mes_id: number;
  mes_status: string;
}

interface Cliente {
  cli_id: number;
  mes_id: number;
  cli_token: string;
}

export default function Qrcode() {
  const [sendMessage, setSendMessage] = useState(false);
  const [mesas, setMesas] = useState<mesa[]>([]);
  const navigation = useNavigation<any>();
  const [cliente, setCliente] = useState<Cliente>({
    cli_id: 0,
    mes_id: 1,
    cli_token: '',
  });
  const { setValue } = useContext(QRCodeContext);

  useEffect(() => {
    async function fetchMesas() {
      const data = await listarMesas();
      setMesas(data);
    }
    fetchMesas();
  }, []);

  function sendMessageTrue() {
    setSendMessage(true);
  }

  async function handleClick() {
    const data = await criarCliente(cliente.mes_id);
    setCliente(data);
  }

  useEffect(() => {
    if (cliente.cli_token) {
      setValue(cliente);
      navigation.navigate('qrcode-gerado');
    }
  }, [cliente.cli_token]);

  const handleChange = (value: string) => {
    setCliente((prevFormulario) => ({
      ...prevFormulario,
      mesa_id: parseInt(value),
    }));
  };

  function directTo() {
    setSendMessage(false);
    navigation.navigate('qrcode')
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'gray' }}>
      <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="black" />} to="home" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View>
          <Text style={{ color: 'black', paddingTop: 5, textAlign: 'center' }}>
            <Text style={{ paddingTop: 5, fontSize: 18, left: 20, width: '100%' }}>
              Selecione uma das mesas disponíveis abaixo para gerar um QR-Code
            </Text>
          </Text>
        </View>
        <Picker
          style={{ width: '100%', color: 'black', fontSize: 20 }}
          selectedValue={cliente.mes_id}
          onValueChange={(itemValue: any) => handleChange(itemValue)}
        >
          <Picker.Item label="Selecione" value={0} />
          {mesas.map((mesa) => (
            <Picker.Item
              key={mesa.mes_id}
              label={`Mesa ${mesa.mes_id}`}
              value={mesa.mes_id}
            />
          ))}
        </Picker>
        <TouchableOpacity onPress={sendMessageTrue}
          style={{
            marginTop: 10,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 10,
          }}>
          <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>
            Gerar
          </Text>
        </TouchableOpacity>
        {sendMessage && (
          <Notification
            directTo={() => { directTo() }}
            title="Gerar QR Code"
            icon={<Text style={{ textAlign: 'center', color: 'white' }}>
              <FontAwesome5 name="question" size={54} />
            </Text>}
            description={`Gerar QR Code para a Mesa ${cliente.mes_id}?`}
            buttonText="Gerar"
            buttonAction={handleClick}
            isModalVisible={sendMessage}
          />
        )}
      </ScrollView>
    </View>
  );
}
