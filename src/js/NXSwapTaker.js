import { NXLocalStorage, NXRecoveryKey, NXWallet } from '@nxswap/nxswap-js';

const LocalStorage = new NXLocalStorage();
const RecoveryKey = new NXRecoveryKey({
	storage: LocalStorage
});
const Wallet = new NXWallet();

async function Setup () {
	await RecoveryKey.loadRecoveryKey({
		autoCreate: false
	});
}

Setup();

export { LocalStorage, RecoveryKey, Wallet };