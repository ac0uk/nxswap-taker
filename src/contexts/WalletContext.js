import React, { useState, useEffect } from 'react';
import { Wallet } from '../js/NXSwapTaker';

import WalletModalDeposit from '../components/Wallet/WalletModalReceive';

const WalletContext = React.createContext();

WalletModalDeposit.contextType = WalletContext;

const WalletProvider = ({ children }) => {
	const [walletInitialised, setWalletInitialised] = useState(false);
	const [walletBalances, setWalletBalances] = useState(false);
	const [modalDepositOpen, setModalDepositOpen] = useState(false);

	useEffect(() => {
    const Setup = async () => {
      setWalletInitialised(Wallet.initialised);
      
			Wallet.on('initialised', (state) => {
				setWalletInitialised(state);
			});

			Wallet.on('balanceUpdate', (state) => {
				setWalletBalances(state);
			});
    };

    Setup();
	}, []);

	return (
		<WalletContext.Provider
			value={{
				walletInitialised,
				walletBalances,
				modalDepositOpen,
				setModalDepositOpen
			}}
		>
			{children}
			<WalletModalDeposit />
		</WalletContext.Provider>
	);
}

function useWalletContext() {
	const context = React.useContext(WalletContext)
	if (context === undefined) {
		throw new Error('WalletContext must be used within a WalletProvider')
	}
	return context
}

export { WalletProvider, useWalletContext, WalletContext, Wallet }