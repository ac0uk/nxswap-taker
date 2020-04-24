import React from 'react';
import { Wallet, NXMeta } from '../../js/NXSwapTaker';

import '../../css/Modal.css';

class WalletModalWithdraw extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      curr: false,
      isConfirm: false,
      isSelectInputs: false,
      sendToAddress: false,
      validSendToAddress: false,
      sendAmount: false,
      sendAmountInvalid: false,
      selectedInputs: false,
      sendFee: 'high',
      subtractFee: false
    }
    this.state = this.defaultState;
  }

  close() {
    this.setModalWithdrawOpen(false);
    this.setState(this.defaultState);
  }

  addressFieldChange(event, curr) {
    let address = event.target.value;
    let validAddress = false;

    if (address.length > 0) {
      validAddress = Wallet.validateCryptoAddress(address, curr);
    }

    this.setState({
      curr: curr,
      sendToAddress: address,
      validSendToAddress: validAddress
    });
  }

  amountFieldChange(event, availableBalance) {
    let amount = event.target.value;
    if (!amount || amount === undefined || amount < 0) {
      amount = false;
    }

    let subtractFee = this.state.subtractFee;

    if (parseFloat(amount) === availableBalance.float) {
      subtractFee = true;
    }

    let sendAmountInvalid = false;

    if( ( amount > 0 && availableBalance.float === 0 ) || ( parseFloat(amount) > availableBalance.float ) ) {
      sendAmountInvalid = true;
    }

    this.setState({
      sendAmount: amount,
      subtractFee: subtractFee,
      sendAmountInvalid: sendAmountInvalid
    });
  }

  SendMax(availableBalance) {
    if (availableBalance.float > 0) {
      this.setState({
        sendAmount: availableBalance.float,
        subtractFee: true,
        sendAmountInvalid: false
      });
    }
  }

  selectFee(fee) {
    this.setState({
      sendFee: fee
    });
  }

  toggleSubtractFeeFromAmount(availableBalance) {
    let amount = this.state.sendAmount;
    let subtract = this.state.subtractFee;

    if (!subtract) {
      this.setState({ subtractFee: true });
    } else {
      if (parseFloat(amount) !== availableBalance.float) {
        // Can only false, if amount to send is less than the balance..
        this.setState({ subtractFee: false });
      }
    }
  }

  CustomSelectFee() {
    let selected = this.state.sendFee;
    let options = [
      {
        id: 'low',
        label: 'Low',
      },
      {
        id: 'medium',
        label: 'Medium'
      },
      {
        id: 'high',
        label: 'High'
      }
    ];

    for (let optionKey in options) {
      let option = options[optionKey];
      if (option.id === selected) {
        options[optionKey].class = "customSelectOption selected";
      } else {
        options[optionKey].class = "customSelectOption";
      }
    }

    const listOptions = options.map((option) => {
      return (
        <span className={option.class} key={option.id} onClick={() => this.selectFee(option.id)}>
          {option.label}
        </span>
      )
    });

    return (
      <div className="customSelect">
        {listOptions}
      </div>
    )
  }

  clickSend (event) {
    event.preventDefault();

    console.log('send', this.state.sendToAddress, this.state.sendAmount, this.state.sendFee, this.state.subtractFee);
  }

  WithdrawForm(curr, meta, availableBalance, pendingBalance) {

    let sendAmount = "";
    if (this.state.sendAmount !== false) {
      sendAmount = this.state.sendAmount;
    }

    let sendAmountInputClass = "";

    if( this.state.sendAmountInvalid ) {
      sendAmountInputClass = "error";
    }

    let isMax = (parseFloat(sendAmount) === availableBalance.float) ? true : false;
    let maxClass = (isMax) ? "amountMax active" : "amountMax";

    let addressPlaceholder = `Enter ${curr} Address`;
    let addressError = (this.state.validSendToAddress || !this.state.sendToAddress) ? false : true;
    let addressInputClass = "";
    if (addressError) {
      addressInputClass = "error";
    }

    let subtractFeeSelectedClass = (this.state.subtractFee) ? "customCheck textRight selected" : "customCheck textRight";
    let subtractFeeActionClass = (this.state.subtractFee) ? "labelAction active" : "labelAction";
    let SendDisabled = (this.state.validSendToAddress && sendAmount > 0 && sendAmount <= availableBalance.float) ? false : true;
    let variableFee = meta.variableFee;

    return (
      <>
      <div className="modalInput">
        <label htmlFor="sendToAddress">
          <span>Send To Address</span>
          {addressError && (
            <span className="labelError">Invalid {curr} Address</span>
          )}
        </label>
        <input id="sendToAddress" className={addressInputClass} onChange={(event) => this.addressFieldChange(event, curr)} name="sendToAddress" type="text" placeholder={addressPlaceholder} spellCheck={false} />
      </div>
      <div className="modalInput">
        <label htmlFor="sendAmount">
          <span>Amount</span>
          <span className="labelAction" onClick={() => this.showSelectInputs(true)}>Select Inputs (Auto)</span>
        </label>
        <input onChange={(event) => this.amountFieldChange(event, availableBalance)} id="sendAmount" name="sendAmount" type="text" value={sendAmount} placeholder="Send Amount" className={sendAmountInputClass} />
        
        <span className="inputAction"><span className={maxClass} onClick={() => this.SendMax(availableBalance)}>Send Max</span></span>
      </div>
      <div className="modalInput">
        <label htmlFor="sendAmount">
          <span>Transaction Fee<small>0.0004 {curr}</small></span>
          <span className={subtractFeeActionClass} onClick={() => this.toggleSubtractFeeFromAmount(availableBalance)}><span className={subtractFeeSelectedClass}>&nbsp;</span>Subtract Fee From Amount</span>
        </label>
        {variableFee && (
          this.CustomSelectFee()
        )}
      </div>
      <div className="modalAction">
        <button disabled={SendDisabled} onClick={(event) => this.clickSend(event)}>Send</button>
      </div>
      </>
    )
  }

  showSelectInputs(state) {
    this.setState({
      isSelectInputs: state
    });
  }

  WithdrawSelectInputs(curr,meta) {
    return (
      <>
      <div className="modalContent">
        <small className="label">
          <span>Select Inputs</span>
          <span className="labelAction" onClick={() => this.showSelectInputs(false)}>Close Input Selection</span></small>
      </div>
      <div className="modalTable">
      
      </div>
      </>
    )
  }

  WithdrawConfirm(curr, meta) {
    return (
      <>
      confirm
      </>
    )
  }

  render() {
    const { modalWithdrawOpen, setModalWithdrawOpen, walletBalances } = this.context;
    let curr = modalWithdrawOpen;
    if (!curr) return false;

    this.setModalWithdrawOpen = setModalWithdrawOpen;
    let meta = NXMeta.currencies[curr];

    let availableBalance = walletBalances[curr].available;
    let pendingBalance = walletBalances[curr].pending;

    let withdrawContent;

    if (this.state.isConfirm) {
      withdrawContent = this.WithdrawConfirm(curr, meta);
    } else {
      if( this.state.isSelectInputs ) {
        withdrawContent = this.WithdrawSelectInputs(curr, meta);
      } else {
        withdrawContent = this.WithdrawForm(curr, meta, availableBalance, pendingBalance);
      }
      
    }

    return (
      <div className="modalWindowOverlay">
        <div className="modalWindow">
        <div className="modalHeader">
          <img src={meta.icon} alt={curr} />
          <h3>Withdraw {meta.name}<small>Available {availableBalance.formatted}
          {pendingBalance.raw > 0 && (
            <> / Pending {pendingBalance.formatted}</>
          )}</small></h3>
          
          <span className="close" onClick={() => this.close()}>
            <img src="/img/close.svg" alt="Close" />
          </span>
        </div>
        {withdrawContent}
        </div>
      </div>
    )
  }
}

export default WalletModalWithdraw;