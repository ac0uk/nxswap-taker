import React, { useState, useEffect } from 'react';
import { SwapAPI } from '../js/NXSwapTaker';

const NXAPIContext = React.createContext();

const NXAPIProvider = ({ children }) => {
  const [NXAPIConnected, setNXAPIConnected] = useState(false);

  useEffect(() => {
    const initNXWS = async () => {
      SwapAPI.on('connected', (connected) => {
        setNXAPIConnected(connected)
      })
    };

    initNXWS();
  }, []);

  return (
    <NXAPIContext.Provider
      value={{
        NXAPIConnected
      }}
    >
      {children}
    </NXAPIContext.Provider>
  );
}

function useNXAPIContext() {
  const context = React.useContext(NXAPIContext)
  if (context === undefined) {
    throw new Error('useNXWSContext must be used within a NXWSProvider')
  }
  return context
}

export { NXAPIProvider, useNXAPIContext }