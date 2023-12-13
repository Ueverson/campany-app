import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import HeaderEmpresa from '../components/HeaderEmpresa';
import { AntDesign } from '@expo/vector-icons';
import styles from './css/loginStyles';
import Notification from '../components/Notification'

interface LoginData {
  col_email: string;
  col_senha: string;
}

interface LoginResponse {
  webToken: string;
}

function Login({ navigation }: any): JSX.Element {
  const [isErrorVisible, setIsErrorVisible] = useState(false);
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
        'https://api-lcvn.onrender.com/colaborador/autenticar/',
        loginData
      );
      const { webToken } = response.data;
      await setTokenWithExpiration(webToken);
      navigation.navigate('home');

    } catch (error) {
      console.error('Usuário ou senha inválidos');
      setIsErrorVisible(true);
    }
  }

  const handleNotificationClose = () => {
    setIsErrorVisible(false);
  };

  return (
    <View style={styles.container}>
      <HeaderEmpresa icon={<AntDesign name="leftcircleo" size={40} style={styles.headerIcon} />} to="login" />
      <Text style={styles.welcomeText}>Bem vindo!</Text>
      <Text style={styles.pageTitle}>Login</Text>
      <Text style={styles.pageSubtitle}>Preencha as informações para logar no sistema.</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={(text) => handleInputChange('col_email', text)}
        value={loginData.col_email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={(text) => handleInputChange('col_senha', text)}
        value={loginData.col_senha}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
      <Notification
        title="Erro de autenticação"
        description="Usuário ou senha inválidos"
        buttonText="OK"
        isModalVisible={isErrorVisible}
        buttonAction={handleNotificationClose}
      />
    </View>
  );
}

export default Login;
