import React from 'react';
import { NegotiatorContext } from "../../contexts/NegotiatorContext";
import { Negotiator, PBMsgr, UserAuthObject } from '../../js/NXSwapTaker';

import ProposalsTable from './ProposalsTable';

class Proposals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSwap: false
    }
  }

  async acceptProposal(id) {
    let accept = Negotiator.acceptSwapProposal(id);
    if( ! accept ) return false;

    await PBMsgr.RESTAPIPost('message/send', {
      send: {
        to: accept.proposal.party_a.pubkey,
        message: {
          proposal_accept: accept
        }
      }
    });
	}

  async declineProposal(id) {
    let decline = Negotiator.declineSwapProposal(id);
    if( ! decline ) return false;

    await PBMsgr.RESTAPIPost('message/send', {
      send: {
        to: decline.proposal.party_a.pubkey,
        message: decline
      }
    });
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
      <div className="splitcolumn top">
        <div className="column marg">
          <div className="trackSwaps">
            <div className="trackSwapsHeader">
              <h3>Swap Proposals</h3>
              <span className="desc">Any current proposals that you have received or have made will appear here.</span>
            </div>
            <div className="swapBars">
            { ! activeProposals ? (
              <>
              <div className="swapBar">
                You don't currently have any current proposals to Swap.
              </div>
              </>
            ) : (
              <ProposalsTable parent={this.state} activeProposals={activeProposals} my_pubkey={my_pubkey} acceptProposal={(a) => this.acceptProposal(a)} declineProposal={(a) => this.declineProposal(a)} />
            )}
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
}

Proposals.contextType = NegotiatorContext;
export default Proposals;