import React from 'react';
import date from 'date-and-time';
import { NXMeta } from '../../js/NXSwapTaker';

class ProposalsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    let proposalsRequiringAttention = this.props.proposalsRequiringAttention;
    let listProposals = proposalsRequiringAttention.map((proposal) => {
      let proposal_id = proposal.proposal_id;
      let key = `${proposal_id}`;

      let depositCurrency = proposal.party_a.currency;
      let receiveCurrency = proposal.party_b.currency;

      let depositCurrencyMeta = NXMeta.currencies[depositCurrency];
      let receiveCurrencyMeta = NXMeta.currencies[receiveCurrency];
  
      let depositCurrencyName = depositCurrencyMeta.name.replace( '(Testnet)', '' );
      let receiveCurrencyName = receiveCurrencyMeta.name.replace( '(Testnet)', '' );

      let expires = proposal.party_a.proposal_expires;
      let now = new Date().getTime();
      let diff = expires - now;
      let seconds = Math.round(diff / 1000);

      return (
        <div key={key} className="swapBar matched">
          <div className="profile">
              <img src="/img/profile-default.png" alt="Profile" />
              <span>3001</span>
            </div>
          <div className="currencySelect">
            <span>Swap Their<small>{depositCurrencyName}</small></span>
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
            <span>For Your<small>{receiveCurrencyName}</small></span>
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
          <div className="action">
            <button className="trackSwap" onClick={() => this.props.viewSwap(proposal_id)}>Accept</button>
          </div>
          <div className="action">
            <button className="trackSwap" onClick={() => this.props.viewSwap(proposal_id)}>Decline</button>
          </div>
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