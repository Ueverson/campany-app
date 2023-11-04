import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Pedido {
  ped_id: number;
  cli_id: number;
  pro_id: number;
  ped_status: string;
  ped_quantidade: number;
  pro_nome: string;
  mes_id: number; // Adicionei o campo mes_id, que parece ser necessário
}

interface CardPedidosProps {
  idMesa: number;
  pedidos: Pedido[];
  moveCard?: (pedidos: Pedido[]) => void;
  isFinalizado: boolean;
  buttonLabel?: string | null;
  exibirButton?: boolean;
  exibirCheckbox?: boolean;
  index?: any;
}

const CardPedidos: React.FC<CardPedidosProps> = ({
  idMesa,
  pedidos,
  moveCard,
  isFinalizado,
  buttonLabel,
  exibirButton,
  exibirCheckbox,
  index,
}) => {
  const [checkboxState, setCheckboxState] = useState<boolean[]>(
    Array(pedidos.length).fill(false)
  );

  const handleCheckboxChange = (checkboxIndex: number) => {
    const updatedCheckboxState = checkboxState.map((checked, index) =>
      index === checkboxIndex ? !checked : checked
    );
    setCheckboxState(updatedCheckboxState);
  };

  const handleCardPronto = () => {
    if (moveCard) {
      moveCard(pedidos);
    }
    setCheckboxState(Array(pedidos.length).fill(false));
  };

  return (
    <View
      style={{
        maxWidth: 300,
        marginVertical: 10,
        backgroundColor: '#FFA500',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Mesa {idMesa}</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          {pedidos.map((pedido, checkboxIndex) => (
            <View
              key={checkboxIndex}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}
            >
              <Text
                style={{
                  backgroundColor: 'white',
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                {pedido.ped_quantidade}
              </Text>
              <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'gray' }}>
                {pedido.pro_nome}
              </Text>
              {exibirCheckbox && (
                <TouchableOpacity
                  style={{ marginLeft: 'auto' }}
                  disabled={isFinalizado}
                  onPress={() => handleCheckboxChange(checkboxIndex)}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderWidth: 1,
                      borderColor: 'blue',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: checkboxState[checkboxIndex]
                        ? 'blue'
                        : 'transparent',
                    }}
                  ></View>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {exibirButton && (
            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                width: 80,
                padding: 10,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleCardPronto}
              disabled={isFinalizado}
            >
              <Text style={{ color: 'white' }}>{buttonLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CardPedidos;
