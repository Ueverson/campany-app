import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import cardPedidosStyles from './css/cardPedidosStyles';

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
    <View style={cardPedidosStyles.container}>
      <View style={cardPedidosStyles.cardContent}>
        <View style={cardPedidosStyles.header}>
          <Text style={cardPedidosStyles.mesaText}>Mesa {idMesa}</Text>
        </View>
        <View style={cardPedidosStyles.itemContainer}>
          {pedidos.map((pedido, checkboxIndex) => (
            <View key={checkboxIndex} style={cardPedidosStyles.itemNameContainer}>
              <Text style={cardPedidosStyles.quantityText}>{pedido.ped_quantidade}</Text>
              <Text style={cardPedidosStyles.itemName}>{pedido.pro_nome}</Text>
              {exibirCheckbox && (
                <TouchableOpacity
                  style={cardPedidosStyles.checkboxContainer}
                  disabled={isFinalizado}
                  onPress={() => handleCheckboxChange(checkboxIndex)}
                >
                  <View
                    style={[
                      cardPedidosStyles.checkbox,
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
        <View style={cardPedidosStyles.buttonContainer}>
          {exibirButton && (
            <TouchableOpacity
              style={cardPedidosStyles.prontoButton}
              onPress={handleCardPronto}
              disabled={isFinalizado}
            >
              <Text style={cardPedidosStyles.prontoButtonText}>{buttonLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CardPedidos;