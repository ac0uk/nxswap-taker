import crypto from 'crypto';

var fetch = require('isomorphic-fetch');
var Dropbox = require('dropbox').Dropbox;
const dch = require('./Dropbox/dropbox-content-hasher');

class NXBackupDropbox {
	constructor({ dropboxClientID }) {
		this.dbx = new Dropbox({ clientId: dropboxClientID, fetch: fetch });
	}
	
	getAuthenticationUrl ({ redirectURL }) {
		let url = this.dbx.getAuthenticationUrl(redirectURL)
		return url
	}
	
	extractAccessToken (string) {
		let parse = this.parseQueryString(string);
		
		if( ! parse || parse.length === 0 || ! parse.access_token) {
			return false;
		}
		
		return parse.access_token;
	}
	
	setAccessToken (accessToken) {
		this.dbx.setAccessToken(accessToken)
	}
  
  async fetchRecoveryObject ( localRecoveryObject ) {
    var fetchCompleted = false;
		var fetchedBlob = false;
    var fetchError = false;
    var fetchedRecoveryObject = false;

    // Attempt to download
		await this.dbx.filesDownload({ path: '/recovery.nxswap.json'}).then( function(data) {
		  fetchedBlob = data.fileBlob;
    }).catch(function (err) {
      var error;
      try {
        error = JSON.parse(err.error);
        fetchError = error;
      }
      catch(error) {
        // not json
        return false;
      }
    });

    if( ! fetchedBlob ) {
      // Unable to download recovery object..
      // Unknown Error?
      if( ! fetchError ) {
        return {
          fetchCompleted,
          fetchedRecoveryObject
        };
      }

      // File not found?
      // Considered fetch completed, return

      if( fetchError.error.path[".tag"] === "not_found" ) {
        fetchCompleted = true;
        return {
          fetchCompleted,
          fetchedRecoveryObject
        }
      }

      // Other errors?
      console.log( 'Fetch Error:' );
      console.log( fetchError );

      return {
        fetchCompleted,
        fetchedRecoveryObject
      }
    }

    // Blob fetched?

    let readBlob = await this.readBlobPromise(fetchedBlob);

    if( ! readBlob ) {
      return false;
    }
    
    fetchCompleted = true;
    fetchedRecoveryObject = readBlob;

		return {
      fetchCompleted,
      fetchedRecoveryObject
    }
	}
  
	async readBlobPromise (blob) {
		return new Promise((resolve) => {
			const fileReader = new FileReader();
			fileReader.onload = function() {
					resolve(this.result);
			};

			fileReader.readAsText(blob);
		});
	}
	
	async saveEncryptedRecoveryObject ( encryptedRecoveryObject ) {
    if( ! encryptedRecoveryObject ) return false;

		let hashedContents = false
		
		try {
			const hasher = dch.create();
			hasher.update(encryptedRecoveryObject);
			hashedContents = hasher.digest('hex')
		}
		catch( error ) {
			return false
    }
		
		var successSave = false;
		
		await this.dbx.filesUpload({path: '/recovery.nxswap.json', contents: encryptedRecoveryObject, mode: 'overwrite' })
			.then(function(response) {
				let content_hash = response.content_hash;
								
				if( content_hash === hashedContents ) {
          // good hash
					successSave = true;
				} else {
					// Delete bad hashed recovery?
					// Rename to corrupt? er
          // shouldn't continue?
          console.log( 'bad hash check');
					successSave = false;
					// return false?
					// but reloading will try and load the recovery file?
				}
			})
			.catch(function(error) {
				console.error(error);
			});
			
		return successSave;
  }
  
  sha256Hash (string) {
		let stringHash = crypto.createHash('sha256').update(string).digest('hex');
		return stringHash;
	}
	
	// argh? really? annoying..
	// to-do: remove? or global maybe, router cannot parse?
	
	parseQueryString (str) {
    var ret = Object.create(null);

    if (typeof str !== 'string') {
      return ret;
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
      return ret;
    }

    str.split('&').forEach(function (param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      // Firefox (pre 40) decodes `%3D` to `=`
      // https://github.com/sindresorhus/query-string/pull/37
      var key = parts.shift();
      var val = parts.length > 0 ? parts.join('=') : undefined;

      key = decodeURIComponent(key);

      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (ret[key] === undefined) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }
    });

    return ret;
  }
}

export default NXBackupDropbox