import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import HeaderEmpresa from '../components/HeaderEmpresa';
import { AntDesign } from '@expo/vector-icons';

interface LoginData {
  col_email: string;
  col_senha: string;
}

interface LoginResponse {
  webToken: string;
}

function Login({ navigation }: any): JSX.Element {
  const [loginData, setLoginData] = useState<LoginData>({
    col_email: '',
    col_senha: '',
  });

  useEffect(() => {
    // Verificar se o usuário já está autenticado (por exemplo, se existe um token salvo)
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const token = await AsyncStorage.getItem('token');
    const expirationTime = await AsyncStorage.getItem('tokenExpirationTime');

    if (token && expirationTime && new Date().getTime() < parseInt(expirationTime, 10)) {
      navigation.navigate('home');
    }
  };

  const handleInputChange = (name: string, value: string): void => {
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const setTokenWithExpiration = async (token: string) => {
    const expirationTime = new Date().getTime() + 3600000; // 1 hora de expiração
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('tokenExpirationTime', expirationTime.toString());
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const response = await axios.post<LoginResponse>(
        'https://cardapio-digital-api.onrender.com/colaborador/autenticar/',
        loginData
      );
      const { webToken } = response.data;
      await setTokenWithExpiration(webToken);
      navigation.navigate('home');

    } catch (error) {
      console.error('Usuário ou senha inválidos');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }}>
      <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} color="black" />} to="login" />
      <Text className="text-3xl mb-4">Login</Text>
      <Text className="pb-4 text-black-500">Preencha as informações para logar no sistema.</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'black',
          backgroundColor: 'white',
          fontSize: 16,
          padding: 10,
          marginBottom: 10,
          width: 300,
          height: 40,
        }}
        placeholder="E-mail"
        onChangeText={(text) => handleInputChange('col_email', text)}
        value={loginData.col_email}
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'black',
          backgroundColor: 'white',
          fontSize: 16,
          padding: 10,
          marginBottom: 10,
          width: 300,
          height: 40,
        }}
        placeholder="Senha"
        secureTextEntry
        onChangeText={(text) => handleInputChange('col_senha', text)}
        value={loginData.col_senha}
      />
      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 10,
        }}
        onPress={handleSubmit}>
        <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
