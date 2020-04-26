import React, { useState, useEffect } from 'react';
import { Wallet } from '../js/NXSwapTaker';

import WalletModalDeposit from '../components/Wallet/WalletModalDeposit';
import WalletModalWithdraw from '../components/Wallet/WalletModalWithdraw';
import WalletModalTransactions from '../components/Wallet/WalletModalTransactions';

const WalletContext = React.createContext();

WalletModalDeposit.contextType = WalletContext;
WalletModalWithdraw.contextType = WalletContext;
WalletModalTransactions.contextType = WalletContext;

const WalletProvider = ({ children }) => {
	const [walletInitialised, setWalletInitialised] = useState(false);
	const [walletBalances, setWalletBalances] = useState(false);
	const [walletUtxos, setWalletUtxos] = useState(false);
	const [modalDepositOpen, setModalDepositOpen] = useState(false);
	const [modalWithdrawOpen, setModalWithdrawOpen] = useState(false);
	const [modalTransactionsOpen, setModalTransactionsOpen] = useState(false);

	useEffect(() => {
    const Setup = async () => {
      setWalletInitialised(Wallet.initialised);
      
			Wallet.on('initialised', (state) => {
				setWalletInitialised(state);
			});

			Wallet.on('balanceUpdate', (state) => {
				setWalletBalances(state);
			});

			Wallet.on('utxoUpdate', (state) => {
				setWalletUtxos(state);
			});
    };

    Setup();
	}, []);

	return (
		<WalletContext.Provider
			value={{
				walletInitialised,
				walletBalances,
				walletUtxos,
				modalDepositOpen,
				setModalDepositOpen,
				modalWithdrawOpen,
				setModalWithdrawOpen,
				modalTransactionsOpen,
				setModalTransactionsOpen
			}}
		>
			{children}
			{modalDepositOpen && (
				<WalletModalDeposit />
			)}
			{modalWithdrawOpen && (
				<WalletModalWithdraw />
			)}
			{modalTransactionsOpen && (
				<WalletModalTransactions />
			)}
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