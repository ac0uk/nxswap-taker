import React from 'react';
import {
  Redirect
} from "react-router-dom";

import { NXBackupContext, NXBackupClient } from "../../contexts/NXBackupContext.js"

class BackupManageEncryption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFormDisabled: false,
      initialEncryptionPasswordInputValue: false
    };

    this.handleInitialEncryptionInputChange = this.handleInitialEncryptionInputChange.bind(this);
    this.handleInitialEncryptionSubmit = this.handleInitialEncryptionSubmit.bind(this);
  }

  handleInitialEncryptionInputChange(event) {
    this.setState({ initialEncryptionPasswordInputValue: event.target.value });
  }

  handleInitialEncryptionSubmit(event) {
    let encryptionPassword = this.state.initialEncryptionPasswordInputValue;
    if (!encryptionPassword) return false;

    // Disable form..

    this.setState({ currentFormDisabled: true });

    // Set encryption password..

    NXBackupClient.setInitialEncryptionPassword(encryptionPassword);

    event.preventDefault();
    return false;
  }

  render() {
    const { backupRequiresEncryption } = this.context;
    if (!backupRequiresEncryption) return (<Redirect to="/backup" />);

    let formDisabledClassName = (this.state.currentFormDisabled) ? "form_loading" : "form_active";
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
}

BackupManageEncryption.contextType = NXBackupContext;
export default BackupManageEncryption;