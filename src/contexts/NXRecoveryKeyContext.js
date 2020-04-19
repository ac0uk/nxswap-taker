import React, { useState, useEffect } from 'react';
import { NXRecoveryKey } from '@nxswap/nxswap-js';
import localStorage from '../js/NXLocalStorage';

const NXRecoveryKeyContext = React.createContext();
const NXRecoveryKeyClient = new NXRecoveryKey({
	storage: localStorage
});

const NXRecoveryKeyProvider = ({ children }) => {
	const [recoveryKeyLoading, setRecoveryKeyLoading] = useState(true);
	const [recoveryKeyLocked, setRecoveryKeyLocked] = useState(false);
	const [recoveryKeyLoaded, setRecoveryKeyLoaded] = useState(false);

	useEffect(() => {
		const init = async () => {
			NXRecoveryKeyClient.setRecoveryKeyLoading = setRecoveryKeyLoading;
			NXRecoveryKeyClient.setRecoveryKeyLocked = setRecoveryKeyLocked;
			NXRecoveryKeyClient.setRecoveryKeyLoaded = setRecoveryKeyLoaded;

			await NXRecoveryKeyClient.loadRecoveryKey({
				autoCreate: false
			});
		};

		init();
	}, []);

	return (
		<NXRecoveryKeyContext.Provider
			value={{
				recoveryKeyLoading,
				recoveryKeyLocked,
				recoveryKeyLoaded
			}}
		>
			{children}
		</NXRecoveryKeyContext.Provider>
	);
}

function useNXRecoveryKeyContext() {
  const context = React.useContext(NXRecoveryKeyContext)
  if (context === undefined) {
    throw new Error('NXRecoveryKeyContext must be used within a NXRecoveryKeyProvider')
  }
  return context
}

export { NXRecoveryKeyProvider, useNXRecoveryKeyContext, NXRecoveryKeyContext, NXRecoveryKeyClient }