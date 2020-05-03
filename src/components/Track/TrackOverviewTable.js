import React from 'react';
import date from 'date-and-time';
import { NXMeta } from '../../js/NXSwapTaker';

class TrackOverviewTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    let loadSwaps = this.props.loadSwaps;
    let listSwaps = loadSwaps.map((swap) => {
      let requestUUID = swap.requestUUID;
      let key = `${requestUUID}`;

      let depositCurrency = swap.fromCurrency;
      let receiveCurrency = swap.toCurrency;

      let depositCurrencyMeta = NXMeta.currencies[depositCurrency];
      let receiveCurrencyMeta = NXMeta.currencies[receiveCurrency];
  
      let depositCurrencyName = depositCurrencyMeta.name.replace( '(Testnet)', '' );
      let receiveCurrencyName = receiveCurrencyMeta.name.replace( '(Testnet)', '' );

      let started = new Date(Math.round(swap.requestSubmitted * 1000));
      let startedDate = date.format(started, 'YYYY/MM/DD');
      let startedTime = date.format(started, 'HH:mm:ss');

      return (
        <div key={key} className="swapBar matched">
          <div className="currencySelect">
            <span>Swap<small>{depositCurrencyName}</small></span>
            <img src={depositCurrencyMeta.icon} alt={depositCurrency} />
          </div>
          <div className="metaCol">
            <small>{depositCurrency} Amount</small>
            <span>{swap.fromAmount}</span>
          </div>
          <div className="currencySelect">
            <span>For<small>{receiveCurrencyName}</small></span>
            <img src={receiveCurrencyMeta.icon} alt={receiveCurrency} />
          </div>
          <div className="metaCol">
            <small>{receiveCurrency} Amount</small>
            <span>{swap.toAmount}</span>
          </div>
          <div className="metaCol">
            <small>Started</small>
            <span className="small">{startedDate}</span>
            <span className="small">{startedTime}</span>
          </div>
          <div className="metaCol">
            <small>Status</small>
            <span>Unknown</span>
          </div>
          <div className="action">
            <button className="trackSwap" onClick={() => this.props.viewSwap(requestUUID)}>View</button>
          </div>
        </div>
      )
    });


    return (
      <>
      {listSwaps}
      </>
    )
  }
}

export default TrackOverviewTable;