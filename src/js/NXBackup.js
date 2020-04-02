import NXBackupDropbox from './NXBackupDropbox'
const store = require('store2')

let backupDropbox = new NXBackupDropbox({ dropboxClientID: 'eo6gmwgr2vwbavh' })

class NXBackup {
	constructor() {
		this.backupConnected = false;
		
		// Backup Object
		this.NXBackupLocalObject = this.fetchOrCreateLocalStoredObject("NXSwapBackup");
		
		// Supported Backup Methods Settings
		this.backupDropbox = backupDropbox
	}
	
	// Determine Backup Status
	
	async determineCurrentBackupStatus () {
		let backupMethod = this.NXBackupLocalObject.backupMethod;
		
		if( ! backupMethod ) {
			return false;
		} else if( backupMethod === "Dropbox") {
			await this.connectDropbox()
		}
		
		if( this.backupConnected ) {
			return true;
		}
		return false;
	}
	
	// Dropbox
	
	async connectDropbox ( ) {
		let dropboxObj = this.NXBackupLocalObject.backupDropbox;
		
		if( ! dropboxObj || ! dropboxObj.accessToken ) {
			return false
		}
		
		console.log( 'connecting dropbox..' );
		console.log( dropboxObj.accessToken )
		
		this.backupDropbox.setAccessToken(dropboxObj.accessToken);
		
		let recoveryObj = await this.backupDropbox.fetchRecoveryObject();
		
		return false;
	}
	
	saveDropboxBackup ( accessToken ) {
		this.NXBackupLocalObject.backupMethod = "Dropbox";
		this.NXBackupLocalObject.backupDropbox = {
			accessToken: accessToken,
			connected: Date.now()
		}
			
		this.saveLocalNXBackupObject();
		this.determineCurrentBackupStatus();
		return true;
	}
	
	// Local Storage Functions
	
	fetchOrCreateLocalStoredObject ( objectName ) {
		let getObject = store(objectName)
		
		if( ! getObject || getObject.length === 0 ) {
			getObject = {
				backupMethod: false
			}

			// Save..
			store(objectName,getObject)
		}
		
		return getObject
	}
	
	saveLocalNXBackupObject ( ) {
		store("NXSwapBackup", this.NXBackupLocalObject);
	}
	
	clearLocalObject ( objectName ) {
		store(objectName, false);
	}
}

export default NXBackup