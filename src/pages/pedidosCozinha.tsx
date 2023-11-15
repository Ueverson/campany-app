import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import HeaderEmpresa from '../components/HeaderEmpresa';
import { AntDesign } from '@expo/vector-icons';
import { AtualizarStatusPedidos, buscarPedidos } from '../service/PedidoService';
import CardPedidos from '../components/cardPedidos';

interface Pedido {
  ped_id: number;
  cli_id: number;
  pro_id: number;
  ped_status: string;
  ped_quantidade: number;
  pro_nome: string;
  mes_id: number;
}

function Pedidos() {
  const [pedidosProntos, setPedidosProntos] = useState<Pedido[][]>([]);
  const [pedidos, setPedidos] = useState<Pedido[][]>([]);

  const handleCardPronto = useCallback((pedidos: Pedido[]) => {
    pedidos.forEach(async (ped) => {
      await AtualizarStatusPedidos('P', ped.ped_id);
    });
  }, []);

  useEffect(() => {
    async function fetchPedidos() {
      await buscarPedidos('A').then((data: Pedido[]) => {
        const grouped: { [key: number]: Pedido[] } = data.reduce((result, item) => {
          const mesid = item.mes_id;
          if (!result[mesid]) {
            result[mesid] = [];
          }
          result[mesid].push(item);
          return result;
        }, {} as { [key: number]: Pedido[] });
        setPedidos(Object.values(grouped));
      });
    }

    fetchPedidos();

    const interval = setInterval(fetchPedidos, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    async function fetchPedidosProntos() {
      await buscarPedidos('P').then((data: Pedido[]) => {
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

  if (
    (!pedidosProntos || pedidosProntos.length === 0) &&
    (!pedidos || pedidos.length === 0)
  ) {
    return (
      <View style={{ backgroundColor: 'gray' }} className='h-full min-h-screen'>
        <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="black" />} to="home" />
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>
            Nenhum pedido finalizado encontrado.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: 'gray' }} className='h-full min-h-screen'>
      <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="black" />} to="home" />
      <ScrollView style={{ padding: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', }}>
              Ativos
            </Text>
            {pedidos.map((pedido, index) => (
              <CardPedidos
                key={pedido[0].ped_id}
                idMesa={pedido[0].mes_id}
                pedidos={pedido}
                moveCard={handleCardPronto}
                index={index}
                isFinalizado={false}
                buttonLabel="Pronto"
                exibirButton={true}
                exibirCheckbox={true}
              />
            ))}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>
              Finalizados
            </Text>
            {pedidosProntos.map((pedido: Pedido[], index: number) => (
              <CardPedidos
                idMesa={pedido[0].ped_id}
                pedidos={pedido}
                index={index}
                buttonLabel="Entregar"
                isFinalizado={false}
                exibirButton={true}
                exibirCheckbox={false}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Pedidos;
