import React, { useState } from 'react';
import { LocalStorage, RecoveryKey, Wallet } from '../js/NXSwapTaker';

const NXRecoveryKeyContext = React.createContext();

const NXRecoveryKeyProvider = ({ children }) => {
	const [recoveryKeyLoading, setRecoveryKeyLoading] = useState(RecoveryKey.recoveryKeyLoading);
	const [recoveryKeyLocked, setRecoveryKeyLocked] = useState(RecoveryKey.recoveryKeyLocked);
	const [recoveryKeyLoaded, setRecoveryKeyLoaded] = useState(RecoveryKey.recoveryKeyLoaded);

	RecoveryKey.setRecoveryKeyLoading = setRecoveryKeyLoading;
	RecoveryKey.setRecoveryKeyLocked = setRecoveryKeyLocked;
	RecoveryKey.setRecoveryKeyLoaded = setRecoveryKeyLoaded;

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