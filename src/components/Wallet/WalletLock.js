import React from 'react';
import {
  Redirect
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
      <>
      <button onClick={this.lockWallet}>confirm lock yo</button>
      </>
    )
  }
}

WalletLock.contextType = NXRecoveryKeyContext;
export default WalletLock;