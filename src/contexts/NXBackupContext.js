import React, { useState, useEffect } from 'react';
import NXBackup from '../js/NXBackup.js';

const NXBackupContext = React.createContext();

const NXBackupClient = new NXBackup();

const NXBackupProvider = ({ children }) => {

	const [backupConnecting, setBackupConnecting] = useState(true);
	const [backupRequiresEncryption, setBackupRequiresEncryption] = useState(false);
	const [backupRequiresDecryption, setBackupRequiresDecryption] = useState(false);
	const [backupConnected, setBackupConnected] = useState(false);

	useEffect(() => {
		const initNXBackup = async () => {
			// Initialise NX Backup Client

			NXBackupClient.setBackupConnecting = setBackupConnecting;
			NXBackupClient.setBackupConnected = setBackupConnected;
			NXBackupClient.setBackupRequiresEncryption = setBackupRequiresEncryption;
			NXBackupClient.setBackupRequiresDecryption = setBackupRequiresDecryption;

			await NXBackupClient.determineCurrentBackupStatus();
		};

		initNXBackup();
	}, []);

	return (
		<NXBackupContext.Provider
			value={{
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

function useNXBackupContext() {
  const context = React.useContext(NXBackupContext)
  if (context === undefined) {
    throw new Error('NXBackupContext must be used within a NXBackupProvider')
  }
  return context
}

export { NXBackupProvider, useNXBackupContext, NXBackupContext, NXBackupClient }