import React from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import IconFuncionalidade from '../components/IconFuncionalidade';
import HeaderEmpresa from '../components/HeaderEmpresa';
import { AntDesign, Feather, MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import homeStyles from './css/homeStyles';

function Home() {
  return (
    <ScrollView style={homeStyles.container}>
      <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="white" />} to="login" />
      <View style={homeStyles.contentContainer}>
        <View style={homeStyles.searchBar}>
          <TextInput
            placeholder="Pesquisar"
            style={homeStyles.input}
          />
        </View>
        <View style={homeStyles.iconContainer}>
          <IconFuncionalidade
            redirect="cadastrar-colaborador"
            icon={<AntDesign name="addusergroup" size={40} color="#c2410c" />}
            alternativeText="Cadastrar colaborador"
          />
          <IconFuncionalidade
            redirect="cadastrar-cargos"
            icon={<Ionicons name="add" size={40} color="#c2410c" />}
            alternativeText="Cadastrar cargo"
          />
          <IconFuncionalidade
            redirect="cargos"
            icon={<FontAwesome name="address-card" size={40} color="#c2410c" />}
            alternativeText="Cargos"
          />
          <IconFuncionalidade
            redirect="qrcode"
            icon={<AntDesign name="qrcode" size={40} color="#c2410c" />}
            alternativeText="QRCode"
          />
          <IconFuncionalidade
            redirect="pedidos-cozinha"
            icon={<Feather name="list" size={40} color="#c2410c" />}
            alternativeText="Pedidos Cozinha"
          />
          <IconFuncionalidade
            redirect="pedidos-garcom"
            icon={<Feather name="list" size={40} color="#c2410c" />}
            alternativeText="Pedidos Garçom"
          />
          <IconFuncionalidade
            redirect="compras"
            icon={<MaterialIcons name="payment" size={40} color="#c2410c" />}
            alternativeText="Compras"
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default Home;