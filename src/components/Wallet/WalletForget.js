import React from 'react';
import {
  Redirect
} from "react-router-dom";

import { NXRecoveryKeyContext, NXRecoveryKeyClient } from "../../contexts/NXRecoveryKeyContext";

class WalletForget extends React.Component {
  async forgetWallet () {
    await NXRecoveryKeyClient.clearSavedRecoveryKey();
    window.location.reload();
  }

  render() {
    const { recoveryKeyLoading, recoveryKeyLoaded } = this.context;

    if (recoveryKeyLoading) return false;
    if( !recoveryKeyLoaded) {
      return (<Redirect to="/get-started" />)
    }

    return (
      <>
      <button onClick={this.forgetWallet}>confirm forget yo</button>
      </>
    )
  }
}

WalletForget.contextType = NXRecoveryKeyContext;
export default WalletForget;