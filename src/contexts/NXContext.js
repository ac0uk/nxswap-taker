import React, {useState, useEffect } from 'react';

import NXBackup from '../js/NXBackup.js'

const NXContext = React.createContext();
const NXProvider = ({children}) => {
	
	const [NXBackupClient, setNXBackupClient] = useState();
	const [backupConnecting, setBackupConnecting] = useState(true);
	const [backupRequiresEncryption, setBackupRequiresEncryption] = useState(false);
	const [backupRequiresDecryption, setBackupRequiresDecryption] = useState(false);
	const [backupConnected, setBackupConnected] = useState(false);
		
	useEffect(() => {
    const initNXBackup = async () => {
			// Initialise NX Backup Client
			const backupClient = await new NXBackup();

			backupClient.setBackupConnecting = setBackupConnecting;
			backupClient.setBackupConnected = setBackupConnected;
			backupClient.setBackupRequiresEncryption = setBackupRequiresEncryption;
			backupClient.setBackupRequiresDecryption = setBackupRequiresDecryption;

			setNXBackupClient(backupClient);
			await backupClient.determineCurrentBackupStatus();
    };
	
    initNXBackup();
  }, []);
	
	return (
    <NXContext.Provider
      value={{
				backupConnecting,
				backupRequiresEncryption,
				backupRequiresDecryption,
				backupConnected,
				NXBackupClient
      }}
    >
      {children}
    </NXContext.Provider>
  );
}

export { NXContext, NXProvider }
