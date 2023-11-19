import { AntDesign } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import CardCompras from '../components/cardCompras';
import solicitacaoCompraStyles from './css/solicitacaoCompraStyles';
import HeaderEmpresa from '../components/HeaderEmpresa';
import { AtualizarStatusPagamentoPedidos, buscarPedidosParaPagamento } from '../service/PedidoService';

interface Pedido {
  ped_id: number;
  cli_id: number;
  pro_id: number;
  ped_status: string;
  ped_quantidade: number;
  pro_nome: string;
  mes_id: number;
}

export default function SolicitacaoCompra() {
  const [pedidosProntos, setPedidosProntos] = useState<Pedido[][]>([]);

  useEffect(() => {
    async function fetchPedidosProntos() {
      await buscarPedidosParaPagamento('F').then((data: Pedido[]) => {
        const grouped: { [key: number]: Pedido[] } = data.reduce((result, item) => {
          const mesid = item.mes_id;
          if (!result[mesid]) {
            result[mesid] = [];
          }
          result[mesid].push(item);

          return result;
        }, {} as { [key: number]: Pedido[] });
        setPedidosProntos(Object.values(grouped));
      });
    }

    fetchPedidosProntos();

    const interval = setInterval(fetchPedidosProntos, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const updateStatus = async (status: string, cli_id: number) => {
    await AtualizarStatusPagamentoPedidos(status, cli_id);
  };

  if (!pedidosProntos || pedidosProntos.length === 0) {
    return (
      <View style={solicitacaoCompraStyles.container}>
        <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="white" />} to="home" />
        <View style={{ alignItems: 'center' }}>
          <Text style={[solicitacaoCompraStyles.textWhite, solicitacaoCompraStyles.pageTitle]}>
            Nenhuma solicitação de pagamento encontrada.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={solicitacaoCompraStyles.container}>
      <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="white" />} to="home" />
      <View style={{ alignItems: 'center' }}>
        <Text style={[solicitacaoCompraStyles.title, solicitacaoCompraStyles.textWhite]}>
          Solicitações para pagamento
        </Text>
      </View>
      {pedidosProntos.map((pedido, index) => (
        <CardCompras
          key={pedido[0].ped_id}
          idMesa={pedido[0].mes_id}
          pedidos={pedido}
          index={index}
          isFinalizado={false}
          exibirButton={true}
          exibirCheckbox={false}
          updateStatus={updateStatus}
        />
      ))}
    </View>
  );
}
