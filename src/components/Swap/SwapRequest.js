import React from 'react';
import {
  Redirect, Link
} from "react-router-dom";

import SwapForm from './SwapForm';

class SwapRequest extends React.Component {

  render() {
    return (
      <>
      <SwapForm type="request" />
      </>
    )
  }
}

export default SwapRequest;