import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import '../../css/Swap.css';
import SwapOffers from './SwapOffers';

function Swap() {
  return (
    <Switch>
      <Route path="/swap"><SwapOffers /></Route>
    </Switch>
  )
}

export default Swap;