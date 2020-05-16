import { NXLocalStorage, NXRecoveryKey, ExplorerBlockbook, NXWallet, NXSwapAPI, Networks } from '@nxswap/nxswap-js';
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

// Connect to NXSwap API
const SwapAPI = new NXSwapAPI({
	WSUrl: 'wss://ws-api-dev56.nxswap.com:8000/connection/websocket',
	sign: false
});

SwapAPI.on('connected', (state) => {
	if(state) {
		let sign = Wallet.getUserAuthObject();
		if( !sign) return false;
		subscribeUserChannel(sign.pubKey.toString('hex'));
	}
});

function subscribeUserChannel () {
	if( !UserAuthObject) return false;
	let pubKeyHash = UserAuthObject.pubKeyHash;
	let privChannel = `$user:${pubKeyHash}`;
	SwapAPI.subscribeChannel(privChannel, false);
}

// NXWallet
const Wallet = new NXWallet();

let UserAuthObject = false;

Wallet.on('initialised', (state) => {
	if( state ) {
		let sign = Wallet.getUserAuthObject();
		SwapAPI.updateSign(sign);
		let pubKey = sign.pubKey.toString('hex');
		let pubKeyHash = crypto.createHash('sha256').update(pubKey).digest('hex');
		UserAuthObject = {
			pubKey: pubKey,
			pubKeyHash: pubKeyHash
		}
		// Subscribe..
		if( SwapAPI.wsConnected ) {
			subscribeUserChannel(sign.pubKey.toString('hex'));
		}
	} else {
		SwapAPI.updateSign(false);
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

export { LocalStorage, RecoveryKey, Wallet, SwapAPI, NXMeta, UserAuthObject };