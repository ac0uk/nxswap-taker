import React from 'react';
import '../../css/Swap.css';
import { NXMeta } from '../../js/NXSwapTaker';

function SwapMatchedOffersTable(props) {
  let parent = props.parent;
  let offers = parent.matchedOffers;

  let depositCurrencyMeta = NXMeta.currencies[parent.depositCurrency];
  let receiveCurrencyMeta = NXMeta.currencies[parent.receiveCurrency];

  let depositCurrencyName = depositCurrencyMeta.name.replace( '(Testnet)', '' );
  let receiveCurrencyName = receiveCurrencyMeta.name.replace( '(Testnet)', '' );

  let count = offers.length;
  let listOffers = false;

  if( count > 0 ) {
    listOffers = offers.map((offer) => {
      let key = `${offer.authUUID}-${offer.instanceUUID}`;
      return (
        <div key={key} className="swapBar">
          <div className="profile">
            <img src="/img/profile-default.png" alt="Profile" />
            <span>3001</span>
          </div>
          <div className="currencySelect">
            <span>Swap<small>{depositCurrencyName}</small></span>
            <img src={depositCurrencyMeta.icon} alt={parent.depositCurrency} />
          </div>
          <div className="metaCol">
            <small>{parent.depositCurrency} Amount</small>
            <span>{offer.fromAmount}</span>
          </div>
          <div className="metaCol">
            <small>{parent.depositCurrency} Confs</small>
            <span>{offer.confirmations}</span>
          </div>
          <div className="currencyArrow">
            <img src="/img/arrow-right.png" alt=">" />
          </div>
          <div className="currencySelect">
            <span>For<small>{receiveCurrencyName}</small></span>
            <img src={receiveCurrencyMeta.icon} alt={parent.receiveCurrency} />
          </div>
          <div className="metaCol">
            <small>{parent.receiveCurrency} Fee: <strong>{offer.feeRate}%</strong></small>
            <span>{offer.fee}</span>
          </div>
          <div className="metaCol">
            <small>Receive {parent.receiveCurrency}</small>
            <span>{offer.toAmount}</span>
          </div>
          <div className="action">
            <button className="requestSwap"><small>Request</small>Swap</button>
          </div>
        </div>
      )
    });
  }

  return (
    <>
    <div className="swapOffersHeader margTop">
      <span>Matched Offers <strong>({count})</strong></span>
    </div>
    <div className="swapOffers">    
      {listOffers}
    </div>
    </>
  )
}

function SwapOfferTable(props) {
  let parent = props.parentState;
  return (
    <SwapMatchedOffersTable parent={parent} />
  )
}

export default SwapOfferTable;