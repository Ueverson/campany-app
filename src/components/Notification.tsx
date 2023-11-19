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
        <TouchableOpacity style={notificationStyles.button} onPress={buttonAction}>
          <Text style={notificationStyles.buttonText}>{buttonText || 'OK'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Notification;