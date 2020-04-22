import { NXLocalStorage, NXRecoveryKey, ExplorerBlockbook, NXWallet, Networks } from '@nxswap/nxswap-js';
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
	}
});

// NXWallet
const Wallet = new NXWallet();

Wallet.on('initialised', (state) => {
	console.log('wallet init event', state);
	Wallet.syncWallet();
});

// Do Bits..
RecoveryKey.loadRecoveryKey({
	autoCreate: false
});

export { LocalStorage, RecoveryKey, Wallet, NXMeta };