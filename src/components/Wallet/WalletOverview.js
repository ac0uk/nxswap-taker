import React from 'react';

import { NXMeta } from '../../js/NXSwapTaker';
import { useWalletContext } from '../../contexts/WalletContext';

function OverviewTable (props) {
  const { walletBalances, setModalDepositOpen, setModalWithdrawOpen, setModalTransactionsOpen } = useWalletContext();
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
    let available = "";
    let availableClass = "";
    let pending = "";
    let pendingClass = "";
    let butClass = "disabled";
    
    if( balance !== undefined ) {
      butClass = "";
      available = balances[curr].available.formatted;
      availableClass = ( balances[curr].available.raw > 0 ) ? "bal notZero" : "bal zero";
      pending = balances[curr].pending.formatted;
      pendingClass = ( balances[curr].pending.raw > 0 ) ? "bal notZero" : "bal zero";
    }

    const onDepositClick = (curr) => {
      setModalDepositOpen(curr);
    }

    const onWithdrawClick = (curr) => {
      setModalWithdrawOpen(curr);
    }

    const onTransactionsClick = (curr) => {
      setModalTransactionsOpen(curr);
    }
    
    return (
      <tr key={curr}>
        <td className="icon"><img src={meta.icon} alt={curr} /></td>
        <td className="name">{meta.name}<span>{curr}</span></td>
        <td className={availableClass}>{available}</td>
        <td className={pendingClass}>{pending}</td>
        <td className="bal zero">0.00000000</td>
        <td className="actions">
          <button className={butClass} onClick={() => { onDepositClick(curr) }}>Deposit</button>
          <button className={butClass} onClick={() => { onWithdrawClick(curr) }}>Withdraw</button>
          <button className={butClass} onClick={() => { onTransactionsClick(curr) }}>Transactions</button>
        </td>
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
            <th className="bal">Available</th>
            <th className="bal">Pending</th>
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