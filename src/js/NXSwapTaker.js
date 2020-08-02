import { NXLocalStorage, NXRecoveryKey, ExplorerBlockbook, NXWallet, NXPBMsgr, Networks } from '@nxswap/nxswap-js';
import NXMeta from './NXMeta';
import crypto from 'crypto'

const SUPPORTED_CURRENCIES = ["TBTC", "TLTC", "TVTC", "TGRS", "DGBT"];

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

// Connect to PBMsgr
const PBMsgr = new NXPBMsgr({
	WSUrl: 'wss://api-dev.pbmsgr.com:8000/connection/websocket',
	sign: false
});

PBMsgr.on('connected', (state) => {
	console.log(`pbmsgr connected ${state}`);
});

// NXWallet
const Wallet = new NXWallet();
let UserAuthObject = false;

Wallet.on('initialised', (state) => {
	console.log(`wallet init ${state}`)
	if( state ) {
		let sign = Wallet.getUserAuthObject();
		let pubKey = sign.pubKey.toString('hex');
		let pubKeyHash = crypto.createHash('sha256').update(pubKey).digest('hex');
		UserAuthObject = {
			pubKey: pubKey,
			pubKeyHash: pubKeyHash
		}
		PBMsgr.updateSign(sign);
		PBMsgr.connectWebsocket();
	
	} else {
		PBMsgr.updateSign(false);
		// disconnect from channel
		// add in unsubscribe here..!!!
	}
});

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
		});
	} else {
		// Not ready.. lock..?
		// Need to uninitialise Wallet..
	}
});

// Do Bits..
RecoveryKey.loadRecoveryKey({
	autoCreate: false
});

export { LocalStorage, RecoveryKey, Wallet, PBMsgr, NXMeta, UserAuthObject, SUPPORTED_CURRENCIES };