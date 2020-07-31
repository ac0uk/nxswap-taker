import React from 'react';
import {
  Redirect, Link
} from "react-router-dom";

import SwapForm from './SwapForm';

class SwapPropose extends React.Component {
  render() {
    return (
      <>
      <SwapForm type="propose" />
      </>
    )
	}
}

export default SwapPropose;