import { NXLocalStorage, NXRecoveryKey, ExplorerBlockbook, NXWallet, NXSwapAPI, Networks } from '@nxswap/nxswap-js';
import NXMeta from './NXMeta';

const SUPPORTED_CURRENCIES = ["TBTC", "TLTC", "TVTC"];

// NXLocalStorage
const LocalStorage = new NXLocalStorage();

// Setup Explorers..
const explorers = {};
for( let net of SUPPORTED_CURRENCIES ) {
	let network = Networks[net];
	let defaultBlockbook = network.defaultBlockbook;
	if( !defaultBlockbook || defaultBlockbook === undefined) continue;
	let explorer = new ExplorerBlockbook({
		node: defaultBlockbook
	});
	explorers[net] = explorer;
}
// NXRecoveryKey
const RecoveryKey = new NXRecoveryKey({
	storage: LocalStorage
});

// NXRecoveryKey Events
RecoveryKey.on('ready', (state) => {
	if(state) {
		// Ready!
		let mnemonic = RecoveryKey.recoveryKey.Wallet.mnemonic;
		if( ! mnemonic || mnemonic === undefined ) return false;
		// Init wallet..
		Wallet.initialiseWallet({
			fromMnemonic: mnemonic,
			explorers: explorers 
		})
	} else {
		// Not ready.. lock..?
		// Need to uninitialise Wallet..
	}
});

// NXWallet
const Wallet = new NXWallet();

// Do Bits..
RecoveryKey.loadRecoveryKey({
	autoCreate: false
});

// Connect to NXSwap API
const SwapAPI = new NXSwapAPI({
	WSUrl: 'wss://ws-api-dev56.nxswap.com:8000/connection/websocket'
});

export { LocalStorage, RecoveryKey, Wallet, SwapAPI, NXMeta };