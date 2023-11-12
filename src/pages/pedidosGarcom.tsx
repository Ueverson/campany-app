import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import HeaderEmpresa from '../components/HeaderEmpresa';
import { AtualizarStatusPedidos, buscarPedidos } from '../service/PedidoService';
import { AntDesign } from '@expo/vector-icons';
import CardPedidosGarcom from '../components/cardPedidosGarcom';


interface Pedido {
  ped_id: number;
  cli_id: number;
  pro_id: number;
  ped_status: string;
  ped_quantidade: number;
  pro_nome: string;
  mes_id: number;
}

function PedidosGarcom() {
  const [pedidosProntos, setPedidosProntos] = useState<Pedido[][]>([]);

  useEffect(() => {
    async function fetchPedidosProntos() {
      await buscarPedidos("P").then((data: Pedido[]) => {
        const grouped: { [key: number]: Pedido[] } = data.reduce(
          (result, item) => {
            const mesid = item.mes_id;
            if (!result[mesid]) {
              result[mesid] = [];
            }
            result[mesid].push(item);
            return result;
          },
          {} as { [key: number]: Pedido[] }
        );
        setPedidosProntos(Object.values(grouped));
      });
    }

    fetchPedidosProntos();

    const interval = setInterval(fetchPedidosProntos, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const updateStatus = async (status: string, ped_id: number) => {
    await AtualizarStatusPedidos(status, ped_id);
  };

  if (!pedidosProntos || pedidosProntos.length === 0) {
    return (
      <View style={{ backgroundColor: 'gray'} } className='h-full min-h-screen'>
        <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="black" />} to="home" />
        <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>
          Nenhum pedido finalizado encontrado.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: 'gray'} } className='h-full min-h-screen'>
      <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="black" />} to="home" />
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>
        Finalizados
      </Text>
      <ScrollView>
        {pedidosProntos.map((pedido, index) => (
          <CardPedidosGarcom
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
      </ScrollView>
    </View>
  );
}

export default PedidosGarcom;
