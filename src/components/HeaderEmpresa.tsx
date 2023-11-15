import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import headerStyles from './css/headerStyles';

const HeaderEmpresa = ({ to, icon }: any) => {
  const navigation = useNavigation<any>();

  return (
    <View style={headerStyles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(to)}>
        <View style={headerStyles.iconContainer}>
          {icon}
        </View>
      </TouchableOpacity>
      <View style={headerStyles.titleContainer}>
        <Text style={headerStyles.titleText}>Rockland Bar</Text>
      </View>
    </View>
  );
}

export default HeaderEmpresa;