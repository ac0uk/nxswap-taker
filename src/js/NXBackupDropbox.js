var fetch = require('isomorphic-fetch');
var Dropbox = require('dropbox').Dropbox;

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
	
	async fetchRecoveryObject () {
		await this.dbx.filesListFolder({path: ''})
			.then(function(response) {
				console.log( response )
				return true;
			})
			.catch(function(error) {
				console.error(error);
				return false;
			});
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