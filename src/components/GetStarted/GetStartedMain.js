import React from 'react';
import {
  Redirect
} from "react-router-dom";

import { useNXRecoveryKeyContext } from "../../contexts/NXRecoveryKeyContext";

function GetStartedMain() {
  const { recoveryKeyLoading, recoveryKeyRequiresDecryption, recoveryKeyLoaded } = useNXRecoveryKeyContext();

  if (recoveryKeyLoading) return false;
  if (recoveryKeyRequiresDecryption) {
    return (<Redirect to="/get-started/decrypt" />)
  }
  if(recoveryKeyLoaded) {
    return (<Redirect to="/" />)
  }

  return (
    <div className="splitcolumn">
      <div className="column">
        <h3>create a new recovery key</h3>
        choose a passphrase<br />
        
        <input type="text" />
        <button>Create</button>
      </div>
      <div className="column">
        <h3>load your recovery key</h3>
      </div>
    </div>
  )
}

export default GetStartedMain;