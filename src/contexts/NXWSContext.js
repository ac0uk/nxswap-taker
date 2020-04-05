import React, {useState, useEffect } from 'react';
import NXWS from '../js/NXWS.js';

const NXWSContext = React.createContext();

const NXWSProvider = ({children}) => {

	const [NXWSClient, setNXWSClient] = useState();
	const [nxwsConnected, setNXWSConnected] = useState(false);
	const [nxwsCurrencies, setNXWSCurrencies] = useState(false);
		
	useEffect(() => {
    const initNXWS = async () => {
			// Initialise NXWS Client
			const nxwsClient = new NXWS();
			nxwsClient.setNXWSConnected = setNXWSConnected;
			nxwsClient.setNXWSCurrencies = setNXWSCurrencies;

			setNXWSClient(nxwsClient);
			await nxwsClient.setupNXWS();
    };
	
    initNXWS();
  }, []);
	
	return (
    <NXWSContext.Provider
      value={{
				NXWSClient,
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

export{ NXWSProvider, useNXWSContext}