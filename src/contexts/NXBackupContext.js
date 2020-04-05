import React, {useState, useEffect } from 'react';
import NXBackup from '../js/NXBackup.js';

const NXBackupContext = React.createContext();

const NXBackupProvider = ({children}) => {
	
	const [NXBackupClient, setNXBackupClient] = useState();
	const [backupConnecting, setBackupConnecting] = useState(true);
	const [backupRequiresEncryption, setBackupRequiresEncryption] = useState(false);
	const [backupRequiresDecryption, setBackupRequiresDecryption] = useState(false);
	const [backupConnected, setBackupConnected] = useState(false);
		
	useEffect(() => {
    const initNXBackup = async () => {
			// Initialise NX Backup Client
			const backupClient = new NXBackup();

			backupClient.setBackupConnecting = setBackupConnecting;
			backupClient.setBackupConnected = setBackupConnected;
			backupClient.setBackupRequiresEncryption = setBackupRequiresEncryption;
			backupClient.setBackupRequiresDecryption = setBackupRequiresDecryption;

			setNXBackupClient(backupClient);
			await backupClient.determineCurrentBackupStatus();

			// Initialise NXWS Client
		//	const nxwsClient = new NXWS();
			//nxwsClient.setNXWSConnected = setNXWSConnected;
			//nxwsClient.setNXWSCurrencies = setNXWSCurrencies;

			//setNXWSClient(nxwsClient);
			//await nxwsClient.setupNXWS();
    };
	
    initNXBackup();
  }, []);
	
	return (
    <NXBackupContext.Provider
      value={{
				NXBackupClient,
				backupConnecting,
				backupRequiresEncryption,
				backupRequiresDecryption,
				backupConnected
      }}
    >
      {children}
    </NXBackupContext.Provider>
  );
}

export { NXBackupContext, NXBackupProvider }
