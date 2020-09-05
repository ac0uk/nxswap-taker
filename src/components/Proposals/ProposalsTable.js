import React from 'react';
import { NXMeta } from '../../js/NXSwapTaker';

class ProposalsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

 
  
  render () {
    let activeProposals = this.props.activeProposals;
    let my_pubkey = this.props.my_pubkey;

    let listProposals = activeProposals.map((proposal) => {
      let proposal_id = proposal.id;
      let key = `${proposal_id}`;

      let party_a = proposal.party_a;
      let party_b = proposal.party_b;

      let party_a_pubkey = party_a.pubkey;
      let party_b_pubkey = party_b.pubkey;

      let iampartya = (party_a_pubkey === my_pubkey) ? true : false;
      let iampartyb = (party_b_pubkey === my_pubkey) ? true : false;

      let depositCurrency = party_a.currency;
      let receiveCurrency = party_b.currency;

      let depositCurrencyMeta = NXMeta.currencies[depositCurrency];
      let receiveCurrencyMeta = NXMeta.currencies[receiveCurrency];
  
      let depositCurrencyName = depositCurrencyMeta.name.replace( '(Testnet)', '' );
      let receiveCurrencyName = receiveCurrencyMeta.name.replace( '(Testnet)', '' );

      let expires = proposal.expires;
      let now = new Date().getTime();
      let diff = expires - now;
      let seconds = Math.round(diff / 1000);

      let accepted = ( proposal.accepted > 0 ) ? true : false;
      let declined = ( proposal.declined > 0 ) ? true : false;

      return (
        <div key={key} className="swapBar matched">
          <div className="profile">
              <img src="/img/profile-default.png" alt="Profile" />
              <span>3001</span>
            </div>
          <div className="currencySelect">
            <span>{iampartya ? (`Swap Your`) : (`Swap Their`)}
              <small>{depositCurrencyName}</small></span>
            <img src={depositCurrencyMeta.icon} alt={depositCurrency} />
          </div>
          <div className="metaCol">
            <small>{depositCurrency} Amount</small>
            <span>{proposal.party_a.amount}</span>
          </div>
          <div className="currencyArrow">
              <img src="/img/arrow-right.png" alt=">" />
            </div>
          <div className="currencySelect">
            <span>{iampartyb ? (`For Your`) : (`For Their`)}<small>{receiveCurrencyName}</small></span>
            <img src={receiveCurrencyMeta.icon} alt={receiveCurrency} />
          </div>
          <div className="metaCol">
            <small>{receiveCurrency} Amount</small>
            <span>{proposal.party_b.amount}</span>
          </div>
          <div className="metaCol">
            <small>Expires In</small>
            <span>{seconds}</span>
          </div>
          {accepted && (
            <>
            <div className="action">
            <span className="info">Status<br />Accepted</span>
            </div>
            <div className="action">
            &nbsp;
            </div>
            </>
          )}
          {declined && (
            <>
            <div className="action">
            <span className="info">Status<br />Declined</span>
            </div>
            <div className="action">
            &nbsp;
            </div>
            </>
          )}
          {iampartyb && !declined && !accepted && (
            <>
            <div className="action">
              <button className="trackSwap" onClick={() => this.props.acceptProposal(proposal_id)}>Accept</button>
            </div>
            <div className="action">
              <button className="trackSwap" onClick={() => this.props.declineProposal(proposal_id)}>Decline</button>
            </div>
            </>
          )}
          {iampartya && !iampartyb && !declined && !accepted && (
            <>
            <div className="action">
            <span className="info">Awaiting<br />Response</span>
            </div>
            <div className="action">
            <button className="trackSwap">Cancel</button>
            </div>
            </>
          )}
        </div>
      )
    });


    return (
      <>
      {listProposals}
      </>
    )
  }
}

export default ProposalsTable;