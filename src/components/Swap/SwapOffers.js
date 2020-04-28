import React from 'react';
import {
  Redirect, Link
} from "react-router-dom";
import { SwapAPI, NXMeta } from '../../js/NXSwapTaker';

class SwapOffers extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			depositCurrency: 'TBTC',
			receiveCurrency: 'TVTC'
		}
  }
  
  render() {
    let supportedCurrencies = [];
		for( let tick in NXMeta.currencies ) {
			supportedCurrencies.push(NXMeta.currencies[tick]);
		}

		let depositCurrency = this.state.depositCurrency;
		let receiveCurrency = this.state.receiveCurrency;

		let depositCurrencyMeta = NXMeta.currencies[depositCurrency];
    let receiveCurrencyMeta = NXMeta.currencies[receiveCurrency];
    
    return (
      <>
      <div className="max-width">
      <div className="swapOffers">
        <div className="swapBar">
          <div className="currencySelect">
            <span>Swap<small>Bitcoin</small></span>
            <img src={depositCurrencyMeta.icon} alt={depositCurrency} />
          </div>
          <div className="flexGrower">
            <div className="currencyInput">
              <input type="text" placeholder="0.00000000" />
            </div>
            <div className="balance">
              <small>TBTC Balance</small>
              <span>3000.00000000</span>
            </div>
            <div className="deposit">
              <button>Deposit TBTC</button>
            </div>
          </div>
          <div className="currencyArrow">
            <img src="/img/arrow-right.png" alt=">" />
          </div>
          <div className="currencySelect">
            <span>For<small>Vertcoin</small></span>
            <img src={receiveCurrencyMeta.icon} alt={receiveCurrency} />
          </div>
        </div>
      </div>
      </div>
      </>
    )
  }
}

export default SwapOffers;