import React, {useState, useEffect } from 'react';

import NXBackup from '../js/NXBackup.js'

const NXContext = React.createContext();
const NXProvider = ({children}) => {
	
	const [NXBackupClient, setNXBackupClient] = useState();
	const [backupConnecting, setBackupConnecting] = useState(true);
	const [backupConnected, setBackupConnected] = useState(false);
		
	useEffect(() => {
    const initNXBackup = async () => {
			
			// Initialise NX Backup Client
			const backupClient = new NXBackup();
			setNXBackupClient(backupClient);
			
			let backupConnectedStatus = await backupClient.determineCurrentBackupStatus();
			
			if( backupConnectedStatus ) {
				setBackupConnected(true);
			}
			
			setBackupConnecting(false);
    };
	
    initNXBackup();
  }, []);
	
	return (
    <NXContext.Provider
      value={{
				backupConnecting,
				backupConnected,
				NXBackupClient
      }}
    >
      {children}
    </NXContext.Provider>
  );
}

export { NXContext, NXProvider }
