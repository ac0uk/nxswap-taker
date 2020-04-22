import React from 'react';

import { NXMeta } from '../../js/NXSwapTaker';
import { useWalletContext } from '../../contexts/WalletContext';

function OverviewTable (props) {
  const { walletBalances, setModalReceiveOpen } = useWalletContext();
  let balances = walletBalances;
  let currencies = [];
  let metaCurrencies = NXMeta.currencies;
  for( let curr in metaCurrencies ) {
    currencies.push(curr);
  }

  if( currencies === undefined || currencies.length === 0 ) {
    return false
  }  
  
  const listItems = currencies.map((curr) => {
    let meta = NXMeta.currencies[curr];
    let balance = balances[curr];
    let confirmed = "";
    let confirmedClass = "";
    let unconfirmed = "";
    let unconfirmedClass = "";
    let butClass = "disabled";
    
    if( balance !== undefined ) {
      butClass = "";
      confirmed = balances[curr].confirmed.formatted;
      confirmedClass = ( balances[curr].confirmed.raw > 0 ) ? "bal notZero" : "bal zero";
      unconfirmed = balances[curr].unconfirmed.formatted;
      unconfirmedClass = ( balances[curr].unconfirmed.raw > 0 ) ? "bal notZero" : "bal zero";
    }

    const onReceiveClick = (curr) => {
      setModalReceiveOpen(curr);
    }
    
    return (
      <tr key={curr}>
        <td className="icon"><img src={meta.icon} alt={curr} /></td>
        <td className="name">{meta.name}<span>{curr}</span></td>
        <td className={confirmedClass}>{confirmed}</td>
        <td className={unconfirmedClass}>{unconfirmed}</td>
        <td className="bal zero">0.00000000</td>
        <td className="actions"><button className={butClass}>Send</button> <button className={butClass} onClick={() => { onReceiveClick(curr) }}>Receive</button> <button className={butClass}>Transactions</button></td>
      </tr>
    )
  });

  return(
    <tbody>{listItems}</tbody>
  )
}

function WalletOverview () {

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
          <OverviewTable />
        </table>
      </div>
    </div>
  )
}

export default WalletOverview;