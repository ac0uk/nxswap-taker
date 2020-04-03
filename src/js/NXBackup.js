import NXBackupDropbox from './NXBackupDropbox'
import crypto from 'crypto';
import sjcl from 'sjcl';
import store from 'store2';

class NXBackup {
	constructor() {
    this.backupRequiresEncrypting = false;
    this.backupRequiresDecrypting = false;
    this.backupConnected = false;
    this.encryptedRecoveryObject = false;

    // Callbacks..
    this.setBackupConnecting = false;
    this.setBackupConnected = false;
    this.setBackupRequiresEncryption = false;
    this.setBackupRequiresDecryption = false;
		
    // Backup Object
    this.recoveryObject = {}
		this.NXBackupLocalObject = this.fetchOrCreateLocalStoredObject("NXSwapBackup");
		
		this.backupDropbox = new NXBackupDropbox({ dropboxClientID: 'eo6gmwgr2vwbavh' })
	}
	
	// Determine Backup Status
	
	async determineCurrentBackupStatus () {
    this.setBackupConnecting(true);
		let backupMethod = this.NXBackupLocalObject.backupMethod;
    let encryptionHash = this.NXBackupLocalObject.encryptionHash;
    
		if( ! backupMethod ) {
      this.setBackupConnecting(false);
			return false;
    }
    
    if( backupMethod === "Dropbox") {
			await this.connectDropbox()
    }

    if( ! this.backupRequiresDecrypting && ! encryptionHash ) {
      this.backupRequiresEncrypting = true;
    }

    this.setBackupConnecting(false);
    //this.clearLocalNXBackupObject();

    return true;
  }

  // Disconnect Backup

  async disconnectBackup () {
    this.clearLocalNXBackupObject();
    this.backupConnected = false;
    this.setBackupConnected(false);
  }

  // Encryption Password..

  setInitialEncryptionPassword ( encryptionPassword ) {
    let hashEncryptionPassword = this.sha256Hash(encryptionPassword);
    
    if( ! this.NXBackupLocalObject.encryptionHash ) {
      this.NXBackupLocalObject.encryptionHash = hashEncryptionPassword;
      this.saveLocalNXBackupObject();
      this.determineCurrentBackupStatus();
      return true;
    }

    return false;
  }

  setCurrentEncryptionPassword ( encryptionPassword ) {
    let hashEncryptionPassword = this.sha256Hash(encryptionPassword);
    this.NXBackupLocalObject.encryptionHash = hashEncryptionPassword;
    
    // Attempt to decode...

    let attemptDecrypt = this.decodeEncryptedRecoveryObject();

    if( ! attemptDecrypt ) {
      return false;
    }

    this.saveLocalNXBackupObject();
    return true;
  }
  
  // Recovery Object

  returnEncryptedRecoveryObject () {
    let localBackupObject = this.NXBackupLocalObject;
    let recoveryObject = this.recoveryObject;

    // Is the encryption hash set?

    let encryptionHash = localBackupObject.encryptionHash;

    if( ! encryptionHash ) {
      return false;
    }

    // Combine for the encrypted backup..
    // Not sure why yet, why not..
    localBackupObject.recoveryObject = recoveryObject;

    // Convert to string..
    let jsonString = JSON.stringify(localBackupObject);
    
    // Encrypt Recovery Object..
    let encryptionHashHash = this.sha256Hash(encryptionHash);
    let encryptedRecoveryObject = sjcl.encrypt( encryptionHashHash, jsonString );

    return encryptedRecoveryObject
  }

  decodeEncryptedRecoveryObject () {
    let encryptedRecoveryObject = this.encryptedRecoveryObject;
    let encryptionHash = this.NXBackupLocalObject.encryptionHash;

    if( ! encryptedRecoveryObject ) {
      return false;
    }

    this.backupRequiresDecrypting = true;
    this.setBackupRequiresDecryption(true); // Callback

    if( ! encryptionHash ) {
      return false;
    }

    let encryptionHashHash = this.sha256Hash(encryptionHash);
    let decryptRecoveryObject = false;

    try {
      decryptRecoveryObject = sjcl.decrypt( encryptionHashHash, encryptedRecoveryObject );	
    } catch( error ) {
      console.log( 'decrypt error:');
      console.log( error );
      return false;
    }
   
    let parseJSON = JSON.parse( decryptRecoveryObject );

    if( ! parseJSON ) {
      return false;
    }

    let recoveryObject = parseJSON.recoveryObject;

    if( ! recoveryObject ) {
      return false;
    }

    console.log('got recovery obj::' )
    console.log(recoveryObject)

    this.recoveryObject = recoveryObject;
    this.backupRequiresDecrypting = false;
    this.setBackupRequiresDecryption(false);
    this.backupRequiresEncrypting = false;
    this.setBackupRequiresEncryption(false);
    this.backupConnected = true;
    this.setBackupConnected(true);
    return true;
  }
	
	// Dropbox
	
	async connectDropbox () {
		let dropboxObj = this.NXBackupLocalObject.backupDropbox;
		
		if( ! dropboxObj || ! dropboxObj.accessToken ) {
			return false
		}
						
    this.backupDropbox.setAccessToken(dropboxObj.accessToken);
    
    let { fetchCompleted, fetchedRecoveryObject } = await this.backupDropbox.fetchRecoveryObject(this.NXBackupLocalObject);

    if( ! fetchCompleted ) {
      // Fetch failed?
      // See error console?
      return false;
    }

    if( ! fetchedRecoveryObject ) {
      // Fetch returned as completed..
      // Recovery object does not exist?

      let encryptedRecoveryObject = await this.returnEncryptedRecoveryObject();

      if( ! encryptedRecoveryObject ) {
        this.setBackupRequiresEncryption(true);
        return false;
      }

      // Save recovery object...
      let saveRecoveryObject = await this.backupDropbox.saveEncryptedRecoveryObject(encryptedRecoveryObject);

      if( ! saveRecoveryObject ) {
        return false;
      }

      // Set fetched to one we made..
      // For the purpose of closing out..
      fetchedRecoveryObject = encryptedRecoveryObject;
    }
    
    this.encryptedRecoveryObject = fetchedRecoveryObject;
    let decodeRecoveryObject = this.decodeEncryptedRecoveryObject();

    if( ! decodeRecoveryObject ) {
      return false;
    }

    // Check it's different? maybe against the local stored backup?
    // to do....
    
    let recoveryObject = decodeRecoveryObject.recoveryObject;

    if( ! recoveryObject ) {
      return false;
    }

    // Still here? should eb good..

    if( this.backupConnected ) {
      return true;
    }

    return false;
  }

  saveDropboxAccessToken ( accessToken ) {
    let newBackupObject = {
      backupMethod: "Dropbox",
      backupDropbox: {
        accessToken: accessToken,
        connected: Date.now()
      }
    }

    this.NXBackupLocalObject = newBackupObject;
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
	
	clearLocalNXBackupObject ( ) {
    store("NXSwapBackup", false);
    this.NXBackupLocalObject = {};
    this.recoveryObject = {};
	}

	sha256Hash (string) {
		let stringHash = crypto.createHash('sha256').update(string).digest('hex');
		return stringHash;
	}
}

export default NXBackup