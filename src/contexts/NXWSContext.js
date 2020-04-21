import React, { useState, useEffect } from 'react';
import NXWS from '../js/NXWS.js';

const NXWSContext = React.createContext();
const NXWSClient = new NXWS();

const NXWSProvider = ({ children }) => {
  const [nxwsConnected, setNXWSConnected] = useState(false);
  const [nxwsCurrencies, setNXWSCurrencies] = useState(false);

  useEffect(() => {
    const initNXWS = async () => {
      NXWSClient.setNXWSConnected = setNXWSConnected;
      NXWSClient.setNXWSCurrencies = setNXWSCurrencies;
      await NXWSClient.setupNXWS();
    };

    initNXWS();
  }, []);

  return (
    <NXWSContext.Provider
      value={{
        nxwsConnected,
        nxwsCurrencies
      }}
    >
      {children}
    </NXWSContext.Provider>
  );
}

function useNXWSContext() {
  const context = React.useContext(NXWSContext)
  if (context === undefined) {
    throw new Error('useNXWSContext must be used within a NXWSProvider')
  }
  return context
}

export { NXWSProvider, useNXWSContext, NXWSClient }