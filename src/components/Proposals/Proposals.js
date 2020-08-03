import React from 'react';
import {
  Redirect
} from "react-router-dom";
import { WalletContext } from "../../contexts/WalletContext";
import { Wallet } from '../../js/NXSwapTaker';

import ProposalsTable from './ProposalsTable';

class Proposals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSwap: false
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

  render () {
    const { proposalsRequiringAttention } = this.context;
    if( proposalsRequiringAttention === undefined ) return false;

    return (
      <>
      <div className="singlecolumn top">
        <div className="trackSwaps">
          <div className="trackSwapsHeader">
            <h3>Swap Proposals</h3>
            <span className="desc">Any current proposals to Swap with peers will appear here, once the proposal has expired it will be removed.</span>
          </div>
          <div className="swapRows">
          { ! proposalsRequiringAttention ? (
            <>
            <div className="swapBar">
              You don't currently have any current proposals to Swap.
            </div>
            </>
          ) : (
            <ProposalsTable parent={this.state} proposalsRequiringAttention={proposalsRequiringAttention} viewSwap={(a) => this.viewSwap(a)} />
          )}
          </div>
        </div>
      </div>
      </>
    )
  }
}

Proposals.contextType = WalletContext;
export default Proposals;