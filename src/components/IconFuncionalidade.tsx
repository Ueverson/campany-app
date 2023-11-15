import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import iconFuncionalidadeStyles from './css/iconFuncionalities';

interface IconProps {
  redirect: string;
  icon: any;
  alternativeText: string;
}

function IconFuncionalidade({ redirect, icon, alternativeText }: IconProps) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(redirect)}>
      <View style={iconFuncionalidadeStyles.container}>
        <View style={iconFuncionalidadeStyles.iconContainer}>
          {icon}
        </View>
        <Text style={iconFuncionalidadeStyles.textContainer}>{alternativeText}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default IconFuncionalidade