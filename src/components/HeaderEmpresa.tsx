import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function HeaderEmpresa({ to, icon }: any) {
  const navigation = useNavigation<any>();

  return (
    <View style={{ alignItems:'center' ,marginTop: 20 }}>
      <View style={{ flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate(to)}>
          <View className="text-orange-500 font-bold justify-center items-center">
            {icon}
          </View>
        </TouchableOpacity>
        <Text className="text-orange-500 text-4xl font-bold justify-center">Rockland Bar</Text>
      </View>
      <Text className="text-white-300 text-xl justify-center font-bold">Bem-vindo!</Text>
    </View>

  );
}

export default HeaderEmpresa;
