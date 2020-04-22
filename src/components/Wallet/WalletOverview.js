import React from 'react';
import {
  Link
} from "react-router-dom";

import { Wallet, NXMeta } from '../../js/NXSwapTaker';
import { useWalletContext } from '../../contexts/WalletContext';

function OverviewTable (props) {
  let currencies = Wallet.activeCurrencies;
  let balances = props.balances;

  console.log('updating balance table');

  if( currencies === undefined || currencies.length === 0 ) {
    return false
  }  

  if( !balances ) return false;
  
  const listItems = currencies.map((curr) => {
    let meta = NXMeta.currencies[curr];
    let confirmed = balances[curr].confirmed.formatted;
    let confirmedClass = ( balances[curr].confirmed.raw > 0 ) ? "bal notZero" : "bal zero";
    let unconfirmed = balances[curr].unconfirmed.formatted;
    let unconfirmedClass = ( balances[curr].unconfirmed.raw > 0 ) ? "bal notZero" : "bal zero";
    return (
      <tr key={curr}>
        <td className="icon"><img src={meta.icon} alt={curr} /></td>
        <td className="name">{meta.name}<span>{curr}</span></td>
        <td className={confirmedClass}>{confirmed}</td>
        <td className={unconfirmedClass}>{unconfirmed}</td>
        <td className="bal zero">0.00000000</td>
        <td className="actions"><button>Send</button> <button>Receive</button> <button>Transactions</button></td>
      </tr>
    )
  });

  return(
    <tbody>{listItems}</tbody>
  )
}

function WalletOverview () {
  const { walletBalances } = useWalletContext();

  return (
    <div className="singlecolumn">
      <div className="walletOverview">
        <div className="walletOverviewHead">
          <h3>Your Non-Custodial Wallet</h3>
          <span className="desc">Funds in this Wallet are completely in your control. They are backed up in your Recovery Key.</span>
        </div>
        <table cellPadding="0" cellSpacing="0">
          <thead>
          <tr>
            <th className="icon">&nbsp;</th>
            <th className="name">Name</th>
            <th className="bal">Confirmed</th>
            <th className="bal">Unconfirmed</th>
            <th className="bal">In Swaps</th>
            <th className="actions">&nbsp;</th>
          </tr>
          </thead>
          <OverviewTable balances={walletBalances} />
        </table>
      </div>
    </div>
  )
}

export default WalletOverview;