import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface NotifyContent {
  directTo?: () => void;
  icon?: JSX.Element;
  closePopUp?: () => void;
  buttonText?: string;
  description?: string;
  title?: string;
  buttonAction?: () => void;
  isModalVisible: boolean;
}

function Notification({
  directTo,
  icon,
  buttonText,
  description,
  title,
  buttonAction,
  isModalVisible,
}: NotifyContent) {

  return (
    <Modal isVisible={isModalVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
        }}
      >
        <TouchableOpacity onPress={directTo}>
          <AntDesign name="leftcircleo" size={40} color={'black'} />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 4 }}>
          {icon}
        </Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          {title}
        </Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', paddingTop: 16 }}>
          {description}
        </Text>
        <Button
          onPress={buttonAction}
          title={buttonText || 'OK'}
          color="black"
        />
      </View>
    </Modal>
  );
}

export default Notification;
