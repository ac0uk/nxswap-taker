import React from 'react';
import {
  Redirect
} from "react-router-dom";

import { NXBackupContext, NXBackupClient } from "../../contexts/NXBackupContext.js"

class BackupManageDecryption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFormDisabled: false,
      decryptionPasswordInputValue: false
    };

    this.handleDecryptionInputChange = this.handleDecryptionInputChange.bind(this);
    this.handleDecryptionSubmit = this.handleDecryptionSubmit.bind(this);
  }

  handleDecryptionInputChange(event) {
    this.setState({ decryptionPasswordInputValue: event.target.value });
  }

  handleDecryptionSubmit(event) {
    let encryptionPassword = this.state.decryptionPasswordInputValue;
    if (!encryptionPassword) return false;

    // Disable form..
    this.setState({ currentFormDisabled: true });

    // Set encryption password..
    let setEncryptionPassword = NXBackupClient.setCurrentEncryptionPassword(encryptionPassword);

    if (!setEncryptionPassword) {
      this.setState({ currentFormDisabled: false });
    }

    event.preventDefault();
    return false;
  }

  render() {
    const { backupRequiresDecryption } = this.context;
    if (!backupRequiresDecryption) return (<Redirect to="/backup" />);

    let formDisabledClassName = (this.state.currentFormDisabled) ? "form_loading" : "form_active";
    let formInputDisabled = this.state.currentFormDisabled ? "disabled" : false;

    return (
      <div>
        please decrypt your backup, you set this password when you originally connected this dropbox account.. <br />
        <form onSubmit={this.handleDecryptionSubmit} className={formDisabledClassName}>
          <input type="password" onChange={this.handleDecryptionInputChange} disabled={formInputDisabled}></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
}

BackupManageDecryption.contextType = NXBackupContext;
export default BackupManageDecryption;