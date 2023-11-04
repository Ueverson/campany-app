import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface IconProps {
  redirect: string;
  icon: any;
  alternativeText: string;
}

function IconFuncionalidade({ redirect, icon, alternativeText }: IconProps) {
  const navigation = useNavigation<any>();

  return (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' , marginTop: 10}}>
      <TouchableOpacity onPress={() => navigation.navigate(redirect)}>
        <View className="text-black-500">
          {icon}
        </View>
      </TouchableOpacity>
      <Text className="mt-2 text-black-250 text-center w-16">{alternativeText}</Text>
    </View>
  );
}

export default IconFuncionalidade;
