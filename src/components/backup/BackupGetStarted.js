import React from 'react';
import {
  Redirect
} from "react-router-dom";

import { useNXBackupContext, NXBackupClient } from "../../contexts/NXBackupContext.js";

function BackupGetStarted() {
  const { backupConnecting, backupConnected, backupRequiresDecryption, backupRequiresEncryption } = useNXBackupContext();

  if (backupConnecting) return false;
  if (backupRequiresEncryption || backupRequiresDecryption || backupConnected) {
    return (<Redirect to="/backup/manage" />)
  }

  // Connect Dropbox..
  let redirectURL = `${window.location.protocol}//${window.location.host}/backup/incomingDropboxConnect`;
  let dropboxAuthURL = NXBackupClient.backupDropbox.getAuthenticationUrl({ redirectURL: redirectURL });

  return (
    <div className="splitcolumn">
      <div className="blurb">
        <div className="blurby">
          <h1>Get Started with NXSwap!</h1>
          <h2>We don’t require you to create an account or verify your identity to us, because we are you.</h2>
          <h3>NXSwaps are carried out between users using a technology called Atomic Swap. NXSwap is just the messenger!</h3>
          <h4>However, in order for this to be the same great experience as a custodial service, there is important data that needs to be backed up by you throughout the process of a Swap.</h4>
          <h4>We have streamlined and automated this process by utilising online file storage services. Currently we only support Dropbox, but plan to expand this based on demand.</h4>
        </div>
      </div>
      <div className="formc">
        <div className="formb">
          dropbox logo<br />
          connect your dropbox<br />
          <button onClick={() => window.location = dropboxAuthURL}>click ere to connect dropbox?</button>
          <br /><br />Connect your Dropbox account. Dropbox creates a folder inside your Dropbox called NXSwap and only gives access to this. This process is handled entirely in your browser, maintaining your privacy.
				</div>
      </div>
    </div>
  )
}

export default BackupGetStarted;