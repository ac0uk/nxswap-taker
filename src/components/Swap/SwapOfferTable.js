import React from 'react';
import '../../css/Swap.css';

function SwapOfferTable(props) {
  let parent = props.parentState;
  let offers = parent.offers;

  if( offers === undefined ) {
    return false;
  }

  const listOffers = offers.map((offer) => {
    let key = `${offer.authUUID}-${offer.instanceUUID}`;
    return (
      <tr key={key}>
        <td>User</td>
        <td className="amount">{offer.fromAmount}</td>
        <td>{offer.feeRate}</td>
        <td>{offer.fee}</td>
        <td>{offer.confirmations}</td>
        <td className="amount">{offer.toAmount}</td>
        <td>request</td>
      </tr>
    )
  });
  return (
    <div className="swapOffers">    
      <h3>Swap Offers</h3>
      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>User</th>
            <th>Swap {parent.depositCurrency}</th>
            <th>Fee %</th>
            <th>Fee {parent.receiveCurrency}</th>
            <th>{parent.depositCurrency} Confs</th>
            <th>Receive {parent.receiveCurrency}</th>
            <th>Request</th>
          </tr>
        </thead>
        <tbody>
          {listOffers}
        </tbody>
      </table>
    </div>
  )
}

export default SwapOfferTable;