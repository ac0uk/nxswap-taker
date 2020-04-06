import React from 'react';
import {
  Redirect
} from "react-router-dom";

import { useNXBackupContext, NXBackupClient } from "../../contexts/NXBackupContext.js";

function BackupManage() {
  const { backupConnecting, backupConnected, backupRequiresDecryption, backupRequiresEncryption } = useNXBackupContext();
  if (backupConnecting) return false;

  if (backupRequiresDecryption) {
    return (<Redirect to="/backup/manage/decryption" />)
  }

  if (backupRequiresEncryption) {
    return (<Redirect to="/backup/manage/encryption" />)
  }

  if (!backupConnected) {
    return (<Redirect to="/backup" />)
  }

  return (
    <div>manage backup.. you are connected to dropbox<br /><button onClick={() => { NXBackupClient.disconnectBackup() }}>disconnect</button></div>
  )
}

export default BackupManage;