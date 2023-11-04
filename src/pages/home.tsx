import React from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import IconFuncionalidade from '../components/IconFuncionalidade';
import HeaderEmpresa from '../components/HeaderEmpresa';
import {AntDesign, Feather ,MaterialIcons, FontAwesome, Ionicons} from '@expo/vector-icons';

function Home() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'gray'}}>
      <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="black" />} to="login" />
      <View style={{ margin: 20 }}>
        <View style={{ paddingBottom: 10 }}>
          <TextInput
            placeholder="Pesquisar"
            style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              paddingLeft: 8,
              paddingVertical: 12,
              fontSize: 16,
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <IconFuncionalidade
            redirect="cadastrar-colaborador"
            icon={<AntDesign name="addusergroup" size={40} color="black" />}
            alternativeText="Cadastrar colaborador"
          />
          <IconFuncionalidade
            redirect="cadastrar-cargos"
            icon={<Ionicons name="add" size={40} color="black" />}
            alternativeText="Cadastrar cargo"
          />
          <IconFuncionalidade
            redirect="cargos"
            icon={<FontAwesome name="address-card" size={40} color="black" />}
            alternativeText="Cargos"
          />
          <IconFuncionalidade
            redirect="qrcode"
            icon={<AntDesign name="qrcode" size={40} color="black" />}
            alternativeText="QRCode"
          />
          <IconFuncionalidade
            redirect="pedidos-cozinha"
            icon={<Feather name="list" size={40} color="black" />}
            alternativeText="Pedidos Cozinha"
          />
          <IconFuncionalidade
            redirect="pedidos-garcom"
            icon={<Feather name="list" size={40} color="black" />}
            alternativeText="Pedidos Garçom"
          />
          <IconFuncionalidade
            redirect="compras"
            icon={<MaterialIcons name="payment" size={40} color="black" />}
            alternativeText="Compras"
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default Home;
