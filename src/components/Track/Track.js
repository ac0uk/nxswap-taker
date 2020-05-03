import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import '../../css/Swap.css';
import TrackOverview from './TrackOverview';

function Wallet() {
  return (
    <Switch>
      <Route path="/track/:requestUUID" component={TrackOverview}></Route>
      <Route path="/track" component={TrackOverview}></Route>
    </Switch>
  )
}

export default Wallet;