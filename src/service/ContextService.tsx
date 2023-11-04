import React, { useEffect, useState, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Cliente {
  cli_id: number;
  mes_id: number;
  cli_token: string;
}

interface QRCodeContextData {
  cliente: Cliente;
  setValue: (cliente: Cliente) => void;
  getCliente: () => Cliente;
}

const QRCodeContext = React.createContext<QRCodeContextData>({
  cliente: { cli_id: 0, mes_id: 0, cli_token: '' },
  setValue: () => { },
  getCliente: () => ({ cli_id: 0, mes_id: 0, cli_token: '' }),
});

const QRCodeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cliente, setCliente] = useState<Cliente>({ cli_id: 0, mes_id: 0, cli_token: '' });

  const setValue = (cliente: Cliente) => {
    setCliente(cliente);
  };

  const getCliente = () => {
    return cliente;
  };

  // Buscar value no AsyncStorage
  useEffect(() => {
    const getValue = async () => {
      try {
        const ValueStorage = await AsyncStorage.getItem('value');
        if (ValueStorage !== null) {
          setCliente(JSON.parse(ValueStorage));
        }
      } catch (error) {
        console.error('Erro ao buscar value do AsyncStorage', error);
      }
    };
    getValue();
  }, []);

  // Salvar value no AsyncStorage
  useEffect(() => {
    const saveValue = async () => {
      try {
        await AsyncStorage.setItem('value', JSON.stringify(cliente));
        
      } catch (error) {
        console.error('Erro ao salvar value no AsyncStorage', error);
      }
    };
    saveValue();
  }, [cliente]);

  return (
    <QRCodeContext.Provider value={{ cliente, setValue, getCliente }}>
      {children}
    </QRCodeContext.Provider>
  );
};

export { QRCodeContext, QRCodeProvider };
