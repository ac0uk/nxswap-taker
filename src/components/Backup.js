import React from 'react';
import {
  Switch,
  Route,
	Redirect
} from "react-router-dom";


import { NXContext } from "../contexts/NXContext.js"

class Backup extends React.Component {
	
	connectDropboxClick () {
		const { NXBackupClient } = this.context
		
		let redirectURL = `${window.location.protocol}//${window.location.host}/backup/incomingDropboxConnect`;
		let dropboxAuthURL = NXBackupClient.backupDropbox.getAuthenticationUrl({redirectURL: redirectURL});
		
		if( ! dropboxAuthURL ) { return false }
		window.location = dropboxAuthURL;
	}
	
	BackupIncomingDropbox () {
		const { NXBackupClient } = this.context
		let extractAccessToken = NXBackupClient.backupDropbox.extractAccessToken(window.location.hash);
		
		if( ! extractAccessToken  || ! NXBackupClient.saveDropboxBackup(extractAccessToken) ) {
			// Errors? to do maybe
			return <Redirect to='/backup' />
		} else {
			return <Redirect to='/backup' />
		}
	}
	
	render() {		 
		return (
			<Switch>
        <Route path="/backup/incomingDropboxConnect" render={() => { return this.BackupIncomingDropbox(); }}></Route>
        <Route path="/backup">
          <div>
						<button onClick={() => this.connectDropboxClick()}>connect dropbox?</button>
					</div>
        </Route>
      </Switch>
		)
	}
}

Backup.contextType = NXContext;
export default Backup;