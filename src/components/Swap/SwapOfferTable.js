import React from 'react';
import {
  Link
} from "react-router-dom";
import '../../css/Swap.css';
import { NXMeta, UserAuthObject } from '../../js/NXSwapTaker';

class SwapOfferTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expiry: false
    }
  }

  render() {
    return this.SwapMatchedOffersTable()
  }

  SwapMatchedOffersTable() {
    let parent = this.props.parentState;
    let currentBalance = this.props.currentBalance;
    let offers = parent.matchedOffers;
  
    let depositCurrencyMeta = NXMeta.currencies[parent.depositCurrency];
    let receiveCurrencyMeta = NXMeta.currencies[parent.receiveCurrency];
  
    let depositCurrencyName = depositCurrencyMeta.name.replace( '(Testnet)', '' );
    let receiveCurrencyName = receiveCurrencyMeta.name.replace( '(Testnet)', '' );
  
    let count = offers.length;
    let listOffers = false;
    let now = parent.now;

    let offersExpire = parent.offersExpire;
    let expiryWindow = '100%';
    let secondsLeft = false;

    if( offersExpire > 0 && count > 0 ) {
      secondsLeft = offersExpire - now;
      if( secondsLeft > 30 ) secondsLeft = 30; // 1 second is allowed for transmission.
      expiryWindow = ( secondsLeft >= 30 ) ? '100%' : ( Math.round( 100 - ( (100/30) * (30 - secondsLeft) ) ) + '%' );
    }

    let requestingSwap = parent.requestingSwap;
    let requestSwap = parent.requestSwap;
    let requestSecondsLeft = false;
    let proposingSwap = parent.proposingSwap;

    if( requestingSwap !== false && requestSwap !== false && proposingSwap === false ) {
      requestSecondsLeft = requestSwap.expires - now;
    }

    let userAuthorised = (UserAuthObject !== false) ? true : false;
  
    if( count > 0 ) {
      listOffers = offers.map((offer) => {
        let key = `${offer.instanceUUID}`;

        if( requestingSwap !== false ) {
          if( offer.instanceUUID !== requestingSwap ) {
            return false
          }
        }

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
              {requestingSwap === false && userAuthorised && (
                <button className="requestSwap" onClick={() => this.props.clickRequestSwap(offer.instanceUUID, offer.hash)}><i style={{bottom: expiryWindow}} className="expiry"></i><small>Request</small><span>Swap</span></button>
              )}
              {requestingSwap === false && ! userAuthorised && (
                <button className="requestSwap" disabled={true}><small>Request</small><span>Swap</span></button>
              )}
              {requestingSwap !== false && (
                <button className="requestSwap" disabled={true}>
                  {proposingSwap === false && (
                  <i className="requesting"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></i>
                  )}
                  <small>Request</small><span>Swap</span>
                </button>
              )}
            </div>
          </div>
        )
      });
    }

    return (
      <div className="swapOffers">  
      {requestingSwap === false && proposingSwap === false && (
      <div className="swapOffersHeader">
        <span>Offers <strong>({count})</strong></span>
        {secondsLeft !== false && userAuthorised && (
          <span>Fixed prices refresh in ({secondsLeft})</span>
        )}
        {userAuthorised === false && (
          <span><Link className="bubble" to="/get-started">You will need a Recovery Key before being able to Swap. Click Here to Get Started</Link></span>
        )}
      </div>
      )}
      {requestingSwap !== false && (
      <div className="swapOffersHeader">
        <span>Requesting Swap..</span>
        {proposingSwap === false && (
          <span>Request timeout in ({requestSecondsLeft})</span>
        )}
      </div>
      )}
      <div className="swapOffersCont">
        {listOffers}
      </div>
      </div>
    )
  }
}

export default SwapOfferTable;