import React from 'react';
import {
  Redirect
} from "react-router-dom";
import { WalletContext } from "../../contexts/WalletContext";
import { Wallet, UserAuthObject } from '../../js/NXSwapTaker';

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
    const { activeProposals } = this.context;
    if( activeProposals === undefined ) return false;

    let userAuthorised = (UserAuthObject !== false) ? true : false;
    if( ! userAuthorised ) return false;

    let my_pubkey = UserAuthObject.pubKey;

    return (
      <>
      <div className="singlecolumn top">
        <div className="trackSwaps">
          <div className="trackSwapsHeader">
            <h3>Swap Proposals</h3>
            <span className="desc">Any current proposals to Swap with peers will appear here, once the proposal has expired it will be removed.</span>
          </div>
          <div className="swapRows">
          { ! activeProposals ? (
            <>
            <div className="swapBar">
              You don't currently have any current proposals to Swap.
            </div>
            </>
          ) : (
            <ProposalsTable parent={this.state} activeProposals={activeProposals} my_pubkey={my_pubkey} viewSwap={(a) => this.viewSwap(a)} />
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