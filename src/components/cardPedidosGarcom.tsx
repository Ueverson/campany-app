import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import cardPedidosGarcomStyles from './css/cardPedidosGarcomStyles';

interface Pedido {
  ped_id: number;
  cli_id: number;
  pro_id: number;
  ped_status: string;
  ped_quantidade: number;
  pro_nome: string;
  mes_id: number;
}

interface CardPedidosGarcomProps {
  idMesa: number;
  pedidos: Pedido[];
  index?: any;
  moveCard?: any;
  isFinalizado: boolean;
  exibirButton?: boolean;
  exibirCheckbox?: boolean;
  updateStatus?: any;
}

const CardPedidosGarcom: React.FC<CardPedidosGarcomProps> = ({
  idMesa,
  pedidos,
  isFinalizado,
  exibirButton,
  exibirCheckbox,
  updateStatus,
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

  const handleEntregue = () => {
    pedidos.map((pedido) => {
      if (updateStatus) {
        updateStatus("E", pedido.ped_id);
      }
    });
  };

  return (
    <View style={cardPedidosGarcomStyles.container}>
      <View style={cardPedidosGarcomStyles.cardContent}>
        <View style={cardPedidosGarcomStyles.header}>
          <Text style={cardPedidosGarcomStyles.mesaText}>Mesa {idMesa}</Text>
        </View>
        <View style={cardPedidosGarcomStyles.itemContainer}>
          {pedidos.map((pedido, checkboxIndex) => (
            <View key={checkboxIndex} style={cardPedidosGarcomStyles.itemNameContainer}>
              <Text style={cardPedidosGarcomStyles.quantityText}>{pedido.ped_quantidade}</Text>
              <Text style={cardPedidosGarcomStyles.itemName}>{pedido.pro_nome}</Text>
              {exibirCheckbox && (
                <TouchableOpacity
                  style={cardPedidosGarcomStyles.checkboxContainer}
                  disabled={isFinalizado}
                  onPress={() => handleCheckboxChange(checkboxIndex)}
                >
                  <View
                    style={[
                      cardPedidosGarcomStyles.checkbox,
                      {
                        backgroundColor: checkboxState[checkboxIndex] ? 'blue' : 'transparent',
                      },
                    ]}
                  ></View>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
        <View style={cardPedidosGarcomStyles.buttonContainer}>
          {exibirButton && (
            <>
              <TouchableOpacity
                style={cardPedidosGarcomStyles.entregueButton}
                onPress={handleEntregue}
                disabled={isFinalizado}
              >
                <Text style={cardPedidosGarcomStyles.entregueButtonText}>Entregue</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default CardPedidosGarcom;
