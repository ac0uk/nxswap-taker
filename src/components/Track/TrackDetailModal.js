import React from 'react';
import {
  Redirect
} from "react-router-dom";
import { RecoveryKey, SwapAPI, NXMeta, UserAuthObject } from '../../js/NXSwapTaker';

class TrackDetailModal extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render () {
    const parent = this.props.parent;
    const viewSwap = parent.viewSwap;
    if( ! viewSwap ) return false;
    let loadSwap = RecoveryKey.swapDB.loadSwap('taker', viewSwap);

    if( ! loadSwap ) {
      this.props.closeViewSwap();
      return false;
    }

    return (
      <div className="modalWindowOverlay">
        <div className="modalWindow">
        <div className="modalHeader">
          <h3>Track Swap</h3>
          <span className="close" onClick={() => this.props.closeViewSwap()}>
            <img src="/img/close.svg" alt="Close" />
          </span>
        </div>
        </div>
      </div>
    )
  }
}

export default TrackDetailModal;