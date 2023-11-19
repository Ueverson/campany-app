import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import cardComprasStyles from './css/cardComprasStyles';

interface Pedido {
  ped_id: number;
  cli_id: number;
  pro_id: number;
  ped_status: string;
  ped_quantidade: number;
  pro_nome: string;
  mes_id: number;
}

interface CardCompras {
  idMesa: number;
  pedidos: Pedido[];
  index?: number;
  moveCard?: any;
  isFinalizado: boolean;
  exibirButton?: boolean;
  exibirCheckbox?: boolean;
  updateStatus?: any;
}

function CardCompras({
  idMesa,
  pedidos,
  index,
  moveCard,
  isFinalizado,
  exibirButton,
  exibirCheckbox,
  updateStatus,
}: CardCompras) {
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
      updateStatus('PG', pedido.cli_id);
    });
  };

  return (
    <View style={cardComprasStyles.container}>
      <View style={cardComprasStyles.cardContent}>
        <View style={cardComprasStyles.header}>
          <Text style={cardComprasStyles.mesaText}>Mesa {idMesa}</Text>
        </View>
        <View style={cardComprasStyles.itemContainer}>
          {pedidos.map((pedido, checkboxIndex) => (
            <View key={checkboxIndex} style={cardComprasStyles.itemNameContainer}>
              <Text style={cardComprasStyles.quantityText}>{pedido.ped_quantidade}</Text>
              <Text style={cardComprasStyles.itemName}>{pedido.pro_nome}</Text>
              {exibirCheckbox && (
                <TouchableOpacity
                  style={cardComprasStyles.checkboxContainer}
                  disabled={isFinalizado}
                  onPress={() => handleCheckboxChange(checkboxIndex)}
                >
                  <View
                    style={[
                      cardComprasStyles.checkbox,
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
        <View style={cardComprasStyles.buttonContainer}>
          {exibirButton && (
            <TouchableOpacity
              style={cardComprasStyles.pagoButton}
              disabled={isFinalizado}
              onPress={handleEntregue}
            >
              <Text style={cardComprasStyles.pagoButtonText}>Pago</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

export default CardCompras;
