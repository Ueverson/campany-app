import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QRCodeProvider } from './src/service/ContextService';
import Routes from './src/routes';

const Stack = createNativeStackNavigator();

export default function App() {
   return (
     <QRCodeProvider>
       <NavigationContainer>
         <Routes />
       </NavigationContainer>
     </QRCodeProvider>
   );
 }
