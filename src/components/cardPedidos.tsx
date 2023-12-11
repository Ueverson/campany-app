import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import cardPedidosStyles from './css/cardPedidosStyles';
import { AntDesign, Feather } from '@expo/vector-icons';
import Notification from './Notification';

interface Pedido {
  ped_id: number;
  cli_id: number;
  pro_id: number;
  ped_status: string;
  ped_quantidade: number;
  pro_nome: string;
  mes_id: number;
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

  const [isNotificationVisible, setNotificationVisible] = useState(false);

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

  const handleObservacoesClick = () => {
    setNotificationVisible(true);
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
              <Text style={cardPedidosStyles.itemName}>{pedido.pro_nome.substring(0, 15)}</Text>
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
          <TouchableOpacity style={cardPedidosStyles.observacoesContainer} onPress={handleObservacoesClick}>
            <Feather style={cardPedidosStyles.observacoesIcon} name="alert-circle" size={24} color="black" />
            <Text style={cardPedidosStyles.observacoesText}>*Observações</Text>
          </TouchableOpacity>
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

      <Notification
        isModalVisible={isNotificationVisible}
        icon={<Feather name="alert-circle" size={40} color={'white'} />}
        title="Observações"
        product={
          [
            {
              item: "Ipiranga 100g",
              obs: "Retirar alface"
            },
            {
              item: "Xisbeicon B.B.Q",
              obs: "Retirar maionese"
            }
          ]
        }
        buttonText="OK"
        buttonAction={() => setNotificationVisible(false)}
      />
    </View>
  );
};

export default CardPedidos;