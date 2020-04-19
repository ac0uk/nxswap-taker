import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

function Wallet() {
  return (
    <Switch>
      <Route path="/wallet/unlock"><div>unlock your wallet yo!</div></Route>
      <Route path="/wallet">wallet</Route>
    </Switch>
  )
}

export default Wallet;