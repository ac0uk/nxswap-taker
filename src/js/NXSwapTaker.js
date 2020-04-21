import { NXLocalStorage, NXRecoveryKey, NXWallet } from '@nxswap/nxswap-js';

const LocalStorage = new NXLocalStorage();
const RecoveryKey = new NXRecoveryKey({
	storage: LocalStorage
});
const Wallet = new NXWallet();

export { LocalStorage, RecoveryKey, Wallet };