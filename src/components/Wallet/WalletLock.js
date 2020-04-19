import React from 'react';
import {
  Redirect, Link
} from "react-router-dom";

import { NXRecoveryKeyContext, NXRecoveryKeyClient } from "../../contexts/NXRecoveryKeyContext";

class WalletLock extends React.Component {
  lockWallet () {
    NXRecoveryKeyClient.clearSavedEncryptionKey();
  }

  render() {
    const { recoveryKeyLoading, recoveryKeyLocked, recoveryKeyLoaded } = this.context;

    if (recoveryKeyLoading) return false;
    if( !recoveryKeyLoaded) {
      return (<Redirect to="/get-started" />)
    }
    else if (recoveryKeyLocked) {
      return (<Redirect to="/wallet/unlock" />)
    }

    return (
      <div className="singlecolumn">
        <div className="column wallet-lock">
        <div className="cont wallet-unlock">
        <h2>Confirm Lock Wallet?</h2>
        <span className="desc">Once your Wallet is locked, you will need to re-enter your passphrase to use it again.</span>
        <div className="actionButton">
          <button class="action" onClick={this.lockWallet}>Confirm Lock Wallet</button>
        </div>
        <Link to="/wallet" className="otheraction">Cancel</Link>
        </div>
        </div>
      </div>
    )
  }
}

WalletLock.contextType = NXRecoveryKeyContext;
export default WalletLock;