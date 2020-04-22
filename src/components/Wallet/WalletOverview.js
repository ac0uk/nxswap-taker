import React from 'react';
import {
  Redirect, Link
} from "react-router-dom";

import { Wallet } from '../../js/NXSwapTaker';

function OverviewTable () {
  let currencies = Wallet.supportedCurrencies;
  
  const listItems = currencies.map((curr) =>
    <tr key={curr}>
      <td>{curr}</td>
      <td>Coin</td>
      <td>0.00000000</td>
      <td>0.00000000</td>
      <td>0.00000000</td>
      <td>Send Receive</td>
      <td>></td>
    </tr>
  );

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
            <th className="icon">Coin</th>
            <th>Name</th>
            <th>Balance</th>
            <th>Unconfirmed</th>
            <th>In Swaps</th>
            <th>&nbsp;</th>
            <th className="details">&nbsp;</th>
          </tr>
          </thead>
          <OverviewTable />
        </table>
      </div>
    </div>
  )
}

export default WalletOverview;