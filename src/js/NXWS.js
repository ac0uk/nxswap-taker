import Centrifuge from 'centrifuge';

class NXWS {
	constructor() {
    // ws
    this.nxwsConnected = false;

    // callbacks
    this.setNXWSConnected = false;
    this.setNXWSCurrencies = false;

    // internnal
    this.channels = {}

    // Currencies this version supports. Hardcoded for reasons.
		this.loadedCurrencies = []
    this.supportedCurrencies = [ "BTC_TESTNET", "LTC_TESTNET" ];
  }

  async setupNXWS () {
    this.ws = new Centrifuge("wss://ws-api-dev56.nxswap.com:8000/connection/websocket", {
			debug: true,
			onPrivateSubscribe: function (data, cb) {
				NXWS.ws.rpc({"method": "authenticateSwap", "payload": data }).then(function(res) {			
					var t = {};				
					t.data = res.data;
					t.status = 200;
					cb(t);
				}, function(err) {
					console.log('rpc error', err);
				});
			}
    });

    this.ws.on('connect', (result) => {
      this.nxwsConnected = true;
      this.setNXWSConnected(true);
      this.loadCurrencies();
    });
    
    // Connect
    this.ws.connect();
  }

  loadCurrencies () {
    // Load from RPC..
    this.ws.rpc({"method": "loadCurrencies"}).then( (res) => {
      var t = Object.values(res);
      this.setCurrencies(t[0]);
      this.channels['currencies'] = this.ws.subscribe('currencies', (message) => {
        this.setCurrencies(message.data)
      });
    }, (err) => {
      console.log('rpc error', err);
    });
  }
  
  setCurrencies (res) {
    if(Array.isArray(res)) {
      for( let key in res ) {
        let value = res[key];
        let ticker = value['ticker'];
        if( ! this.supportedCurrencies.includes(ticker) ) {
          for( var i = 0; i < res.length; i++){ 
            if ( res[i]['ticker'] === ticker) {
              res.splice(i, 1); 
            }
          }
        }
      }
      this.loadedCurrencies = res;
      this.setNXWSCurrencies(this.loadedCurrencies);
    }
  }
  
  lookupCurrency (ticker) {
    for (const curr of this.loadedCurrencies) {
        if( curr.ticker === ticker ) {
        return curr
      }
    }
    return false;
  }
}

export default NXWS;