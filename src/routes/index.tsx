import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/login';
import Pedidos from '../pages/pedidosCozinha';
import CadastrarCargos from '../pages/cadastrarCargos';
import QrCode from '../pages/qrcode';
import Cargos from '../pages/cargos';
import PedidosGarcom from '../pages/pedidosGarcom';
import CadastrarColaborador from '../pages/cadastrarColaborador';
import SolicitacaoCompra from '../pages/solicitacaoCompra';
import Home from '../pages/home';
import QRCodeImagem from '../pages/QRCodeImagem';
const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="home" component={Home} options={{headerShown: false}}/>
      <Stack.Screen name="pedidos-cozinha" component={Pedidos} options={{headerShown: false}}/>
      <Stack.Screen name="cadastrar-colaborador" component={CadastrarColaborador} options={{headerShown: false}}/>
      <Stack.Screen name="cargos" component={Cargos} options={{headerShown: false}}/>
      <Stack.Screen name="pedidos-garcom" component={PedidosGarcom} options={{headerShown: false}}/>
      <Stack.Screen name="compras" component={SolicitacaoCompra} options={{headerShown: false}}/>
      <Stack.Screen name="cadastrar-cargos" component={CadastrarCargos} options={{headerShown: false}}/>
      <Stack.Screen name="qrcode" component={QrCode} options={{headerShown: false}}/>
      <Stack.Screen name="qrcode-gerado" component={QRCodeImagem} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}
