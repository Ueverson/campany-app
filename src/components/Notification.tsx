import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import notificationStyles from '../components/css/notificationStyles';

interface NotificationProps {
  directTo?: () => void;
  icon?: JSX.Element;
  closePopUp?: () => void;
  buttonText?: string;
  description?: string;
  product?: {
    item?: string | string[],
    obs?: string | string[],
  }[],
  title?: string;
  buttonAction?: () => void;
  isModalVisible?: boolean;
}

const Notification: React.FC<NotificationProps> = ({
  directTo,
  icon,
  buttonText,
  description,
  title,
  product,
  buttonAction,
  isModalVisible,
}: NotificationProps) => {
  return (
    <Modal isVisible={isModalVisible}>
      <View style={notificationStyles.container}>
        <TouchableOpacity onPress={directTo} style={notificationStyles.closeButton}>
          <AntDesign name="leftcircleo" size={40} color={'white'} />
        </TouchableOpacity>
        <Text style={notificationStyles.icon}>{icon}</Text>
        <Text style={notificationStyles.title}>{title}</Text>
        <Text style={notificationStyles.description}>{description}</Text>
        <View>
          {product?.map((item, index) => (
            <View style={notificationStyles.productContainer} key={index}>
              <Text style={notificationStyles.productName}>{item.item}</Text>
              <Text style={notificationStyles.obsText}>Obs: {item.obs}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={notificationStyles.button} onPress={buttonAction}>
          <Text style={notificationStyles.buttonText}>{buttonText || 'OK'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};


export default Notification;