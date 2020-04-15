import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { NXBackupClient } from "../../contexts/NXBackupContext.js";
import BackupGetStarted from "./BackupGetStarted.js";
import BackupManage from "./BackupManage.js";
import BackupManageDecryption from "./BackupManageDecryption.js";
import BackupManageEncryption from "./BackupManageEncryption.js";

function Backup() {
  return (
    <Switch>
      <Route path="/backup/incomingDropboxConnect"><IncomingDropboxConnect /></Route>
      <Route path="/backup/manage/decryption"><BackupManageDecryption /></Route>
      <Route path="/backup/manage/encryption"><BackupManageEncryption /></Route>
      <Route path="/backup/manage"><BackupManage /></Route>
      <Route path="/backup/disconnect"><IncomingDropboxConnect /></Route>
      <Route path="/backup"><BackupGetStarted /></Route>
    </Switch>
  )
}

// Page > Incoming Dropbox Connect
function IncomingDropboxConnect() {
  if (!NXBackupClient) {
    return false
  }

  let extractAccessToken = NXBackupClient.backupDropbox.extractAccessToken(window.location.hash);
  NXBackupClient.saveDropboxAccessToken(extractAccessToken);

  return (<Redirect to="/backup" />)
}

export default Backup;