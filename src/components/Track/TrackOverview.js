import React from 'react';
import {
  Redirect
} from "react-router-dom";
import { RecoveryKeyContext } from "../../contexts/RecoveryKeyContext";
import { RecoveryKey, SwapAPI, NXMeta, UserAuthObject } from '../../js/NXSwapTaker';

import TrackOverviewTable from './TrackOverviewTable';
import TrackDetailModal from './TrackDetailModal';

class TrackOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSwap: false
    }

    let match = this.props.match;
    let params = match.params;

    if( params.requestUUID !== false ) {
      this.state.viewSwap = params.requestUUID;
    }
  }

  viewSwap(requestUUID) {
    this.setState({
      viewSwap: requestUUID
    });
  }

  closeViewSwap() {
    this.setState({
      viewSwap: false
    })
  }

  returnEmptySwapDB () {
    return (
      <>
      you don't have any swaps to track bro.
      </>
    )
  }

  render () {
    const { recoveryKeyLoading, recoveryKeyLocked, recoveryKeyLoaded } = this.context;

    if (recoveryKeyLoading) return false;
    if (recoveryKeyLoaded && recoveryKeyLocked) return (<Redirect to="/wallet/unlock" />)
    if (!recoveryKeyLoaded) return (<Redirect to="/get-started" />)

    let match = this.props.match;
    let params = match.params;

    if( params.requestUUID !== undefined ) {
      if( params.requestUUID !== this.state.viewSwap ) {
        return (<Redirect to="/track" />)
      }
    }

    // Load Swaps..
    let loadSwaps = RecoveryKey.swapDB.loadSwaps('taker');

    return (
      <>
      <div className="singlecolumn">
      {!loadSwaps ? this.returnEmptySwapDB() 
      : (
        <div className="trackSwaps">
          <div className="trackSwapsHeader">
            <h3>Track Your Swaps</h3>
            <span className="desc">Here you can track the status and see a history of your Swaps. If a Swap requires your attention, you must View the Swap so that it can continue.</span>
          </div>
          <div className="swapRows">
          <TrackOverviewTable parent={this.state} loadSwaps={loadSwaps} viewSwap={(a) => this.viewSwap(a)} />
          </div>
        </div>
      )}
      </div>
      {this.state.viewSwap !== false && (
        <TrackDetailModal parent={this.state} closeViewSwap={() => this.closeViewSwap()} />
      )}
      </>
    )
  }
}

TrackOverview.contextType = RecoveryKeyContext;
export default TrackOverview;