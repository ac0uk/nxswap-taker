import React from 'react';
import { Wallet, NXMeta } from '../../js/NXSwapTaker';

import '../../css/Modal.css';

class SwapProposalModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    let proposingSwap = this.props.parentState.proposingSwap;
    if( ! proposingSwap ) return false;

    let proposeSwap = this.props.parentState.proposeSwap;
    let proposalExpires = proposeSwap.requestAcceptExpires;

    let proposalTimeLeft = proposalExpires - this.props.parentState.now;

    return (
      <div className="modalWindowOverlay">
        <div className="modalWindow">
          <div className="modalHeader">
            <h3>Ready To Swap</h3>
            <span>Offer Expires in ({proposalTimeLeft})</span>
          </div>
          <div className="modalText">
            Confirm the details below, and Start Swap. The Swap will then automatically take place, you must leave your browser window open.
          </div>
          <div className="modalAction">
            <button className="cancel" onClick={() => this.props.cancelSwapProposal()}>Cancel</button>
            <button className="confirm" onClick={() => this.props.acceptSwapProposal()}>Start Swap</button>
         </div> 
        </div>
      </div>
    )
  }
}

export default SwapProposalModal;