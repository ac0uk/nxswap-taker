import React, { useState, useEffect } from 'react';
import { LocalStorage, RecoveryKey, Wallet } from '../js/NXSwapTaker';

const NXRecoveryKeyContext = React.createContext();

const NXRecoveryKeyProvider = ({ children }) => {
	const [recoveryKeyLoading, setRecoveryKeyLoading] = useState(true);
	const [recoveryKeyLocked, setRecoveryKeyLocked] = useState(false);
	const [recoveryKeyLoaded, setRecoveryKeyLoaded] = useState(false);

	useEffect(() => {
		const init = async () => {
			RecoveryKey.setRecoveryKeyLoading = setRecoveryKeyLoading;
			RecoveryKey.setRecoveryKeyLocked = setRecoveryKeyLocked;
			RecoveryKey.setRecoveryKeyLoaded = setRecoveryKeyLoaded;

			await RecoveryKey.loadRecoveryKey({
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

export { NXRecoveryKeyProvider, useNXRecoveryKeyContext, NXRecoveryKeyContext, RecoveryKey }