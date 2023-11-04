import { useContext } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { QRCodeContext } from '../service/ContextService';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import HeaderEmpresa from '../components/HeaderEmpresa';
import { AntDesign } from '@expo/vector-icons';

function QRCodeImagem() {
  const { getCliente } = useContext(QRCodeContext);
  const cliente = getCliente();
  const navigation = useNavigation<any>();
  const url = `https://cardapiodigital.vercel.app/inicio?id=${cliente.cli_id}&token=${cliente.cli_token}`;

  return (
    <View style={{ backgroundColor: 'gray', flex: 1 }}>
      <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="black" />} to="home" />
      <TouchableOpacity onPress={() => navigation.navigate('qrcode')}></TouchableOpacity>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
          Aponte a câmera do seu celular para o QR-Code abaixo!
        </Text>
        <View style={{ padding: 20, marginBottom: 25, alignContent: 'center' }}>
          <QRCode value={url} size={256} color="black" />
        </View>
        <View style={{ padding: 20, marginBottom: 25, alignContent: 'center' }}>
          <Text style={{ fontSize: 20, textAlign: 'center' }}>QR-Code referente a</Text>
          <Text style={{ fontSize: 20, textAlign: 'center' }}>Mesa {cliente.mes_id}</Text>
        </View>
      </View>
    </View>
  );
}
export default QRCodeImagem;
