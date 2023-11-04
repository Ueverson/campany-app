import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import validaToken from './ValidaTokenService';

function AuthWrapper({ children } : any ) {
    const navigation = useNavigation<any>();
  const [isTokenValid, setTokenValid] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function checkTokenValidity() {
      try {
        const token = ''//await AsyncStorage.getItem('token');

        if (token) {
          const isValid = await validaToken(token); // Use sua função de validação de token
          setTokenValid(isValid);

          if (!isValid) {
            navigation.navigate("Login");
          }
        } else {
          navigation.navigate('Login');
        }

        setLoading(false);
      } catch (error) {
        console.error('Erro ao verificar a validade do token:', error);
      }
    }

    checkTokenValidity();
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isTokenValid ? children : null;
}

export default AuthWrapper;
