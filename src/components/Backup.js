import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

import { NXContext } from "../contexts/NXContext.js"

class Backup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFormDisabled: false,
      initialEncryptionPasswordInputValue: false,
      decryptionPasswordInputValue: false
    };    

    this.handleInitialEncryptionInputChange = this.handleInitialEncryptionInputChange.bind(this);
    this.handleInitialEncryptionSubmit = this.handleInitialEncryptionSubmit.bind(this);
    this.handleDecryptionInputChange = this.handleDecryptionInputChange.bind(this);
    this.handleDecryptionSubmit = this.handleDecryptionSubmit.bind(this);
  }
	
  // Render..
	
	render() {
		const { backupConnecting, NXBackupClient } = this.context;
    if( ! NXBackupClient || backupConnecting ) return false;
				
		return (
			<Switch>
				<Route path="/backup/incomingDropboxConnect" render={() => { return this.incomingDropboxConnect(); }}></Route>
				<Route path="/backup/manage" render={() => { return this.backupManage(); }}></Route>
        <Route path="/backup/disconnect" render={() => { return this.backupDisconnect(); }}></Route>
				<Route path="/backup" render={() => { return this.backupGetStarted(); }}></Route>
			</Switch>
		)
	}
	
	// Page Content
	
	backupGetStarted () {
    const { backupConnecting, backupConnected, backupRequiresDecryption, backupRequiresEncryption } = this.context

    if( backupConnecting ) {
      return false;
    }

    if( backupRequiresEncryption || backupRequiresDecryption || backupConnected ) {
      return ( <Redirect to="/backup/manage" /> )
    }

		return (
			<div>
				get started<br />
        nxswap only gets access to its own folder, it does not get access to your whole dropbox<br />
        nxswap does not access any of your personal information<br />
				<button onClick={() => this.connectDropboxClick()}>connect dropbox?</button>
			</div>
		)
  }

  backupDisconnect () {
    let { backupConnecting, backupConnected, backupRequiresDecryption, backupRequiresEncryption } = this.context;
    
    if( backupConnecting ) return false;

    if( ! backupConnected && ! backupRequiresDecryption && ! backupRequiresEncryption ) {
      return ( <Redirect to="/" /> )
    }

    return ( 
      <button onClick={() => this.doDisconnect()}>disconnect</button>
    )
  }
  
  backupManage () {
    const { backupConnecting, backupConnected, backupRequiresDecryption, backupRequiresEncryption } = this.context
    if( backupConnecting ) return false;

    if( ! backupConnected && ! backupRequiresDecryption && ! backupRequiresEncryption ) {
      return ( <Redirect to="/backup" /> )
    }

    if( backupRequiresDecryption ) {
      return this.backupManageDecryption();
    }
    else if( backupRequiresEncryption ) {
      return this.backupManageInitialEncryption();
    }

    return ( 
      <div>backup manage<br /><Link to="/backup/disconnect">disconnect</Link></div> 
    )
  }

  // Page > Encrypt Backup

  backupManageInitialEncryption () {
    let formDisabledClassName = ( this.state.currentFormDisabled ) ? "form_loading" : "form_active";
    let formInputDisabled = this.state.currentFormDisabled ? "disabled" : false

    return (
      <div>
        We can now backup your funds to your dropbox,<br />
        please choose an encryption password <br />
        this is not your dropbox password <br />
        if you lose your password, you risk losing your funds. do not lose it.<br />
        NXSwap has no control over this password or your funds<br />ok?<br />
        <form onSubmit={this.handleInitialEncryptionSubmit} className={formDisabledClassName}>
          <input type="password" onChange={this.handleInitialEncryptionInputChange} disabled={formInputDisabled}></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
	
  handleInitialEncryptionInputChange (event) {
    this.setState( {initialEncryptionPasswordInputValue: event.target.value} );
  }

  handleInitialEncryptionSubmit (event) {
    let encryptionPassword = this.state.initialEncryptionPasswordInputValue;
    if( ! encryptionPassword ) return false;

    const { NXBackupClient } = this.context

    // Disable form..

    this.setState({ currentFormDisabled: true });

    // Set encryption password..

    NXBackupClient.setInitialEncryptionPassword(encryptionPassword);

    event.preventDefault();
    return false;
  }

  // Page > Decrypt Backup

  backupManageDecryption () {
    let formDisabledClassName = ( this.state.currentFormDisabled ) ? "form_loading" : "form_active";
    let formInputDisabled = this.state.currentFormDisabled ? "disabled" : false;

    return (
      <div>
        please decrypt your backup, you set this password when you connected dropbox.. <br />
        <form onSubmit={this.handleDecryptionSubmit} className={formDisabledClassName}>
          <input type="password" onChange={this.handleDecryptionInputChange} disabled={formInputDisabled}></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }

  handleDecryptionInputChange (event) {
    this.setState( {decryptionPasswordInputValue: event.target.value} );
  }

  handleDecryptionSubmit (event) {
    let encryptionPassword = this.state.decryptionPasswordInputValue;
    if( ! encryptionPassword ) return false;

    const { NXBackupClient } = this.context

    // Disable form..
    this.setState({ currentFormDisabled: true });

    // Set encryption password..
    let setEncryptionPassword = NXBackupClient.setCurrentEncryptionPassword(encryptionPassword);

    if( ! setEncryptionPassword ) {
      this.setState({ currentFormDisabled: false });
    }

    event.preventDefault();
    return false;
  }

  // Page > Incoming Dropbox Connect

  incomingDropboxConnect () {
		const { NXBackupClient } = this.context
		
		if( ! NXBackupClient ) {
			return false
    }
    
    let extractAccessToken = NXBackupClient.backupDropbox.extractAccessToken(window.location.hash);
    NXBackupClient.saveDropboxAccessToken(extractAccessToken);

    return( <Redirect to="/backup"></Redirect> )
  }
	
  // Functions
  
	connectDropboxClick () {
		const { NXBackupClient } = this.context;
		
		let redirectURL = `${window.location.protocol}//${window.location.host}/backup/incomingDropboxConnect`;
		let dropboxAuthURL = NXBackupClient.backupDropbox.getAuthenticationUrl({redirectURL: redirectURL});
		
		if( ! dropboxAuthURL ) { return false }
		window.location = dropboxAuthURL;
  }
  
  doDisconnect () {
    const { NXBackupClient } = this.context;
    NXBackupClient.disconnectBackup();
  }
}

Backup.contextType = NXContext;
export default Backup;