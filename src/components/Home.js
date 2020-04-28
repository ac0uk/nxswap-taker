import React from 'react';
import { NXMeta } from '../js/NXSwapTaker';

import '../css/Swap.css';

import CurrencySelector from './Swap/CurrencySelector';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			depositCurrency: 'TBTC',
			receiveCurrency: 'TVTC',
			showCurrencySelector: false,
			showCurrencySelectorFor: false
		}
	}

	showCurrencySelector(which) {
		this.setState({
			showCurrencySelector: true,
			showCurrencySelectorFor: which
		})
	}

	hideCurrencySelector() {
		this.setState({
			showCurrencySelector: false,
			showCurrencySelectorFor: false
		})
	}

	onSelectCurrency(currency) {
		let newState = {
			showCurrencySelector: false,
			showCurrencySelectorFor: false
		}

		if( this.state.showCurrencySelectorFor === 'deposit' ) {
			newState.depositCurrency = currency;
		} else if( this.state.showCurrencySelectorFor === 'receive') {
			newState.receiveCurrency = currency;
		}

		this.setState(newState);
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
			<div className="singlecolumn">
				<div className="homepage">
					<div className="meta">
						<div className="metaMain">
							<h1>Truly Non-Custodial Swaps</h1>
							<h2>&ldquo;Not Your Keys, Not Your Coins&rdquo;</h2>
						</div>
						<div className="metaSub">
							<span>Using the power of Atomic Swaps, your funds never leave your custody. It's secure, it's private and it's just as easy as your typical Swap platform.</span>
						</div>
					</div>
				</div>
				<div className="swap">
					<div className="swapamountbar">
						<div className="amountfield">
							<label htmlFor="swap_amount">Swap</label>
							<input type="text" id="swap_amount" placeholder="0.00000000" />
							<span className="icon"><img src={depositCurrencyMeta.icon} alt={depositCurrency} /></span>
							<span className="select" onClick={() => {this.showCurrencySelector('deposit')}}>{depositCurrency}</span>
						</div>
						<div className="amountfield">
							<label htmlFor="for_amount">For</label>
							<input type="text" id="for_amount" placeholder="0.00000000" />
							<span className="icon"><img src={receiveCurrencyMeta.icon} alt={receiveCurrency} /></span>
							<span className="select" onClick={() => {this.showCurrencySelector('receive')}}>{receiveCurrency}</span>
						</div>
						<div className="buttonfield">
							<button className="swap">Swap</button>
						</div>
					</div>
				</div>
			</div>
			{this.state.showCurrencySelector !== false && (
				<CurrencySelector parentState={this.state} supportedCurrencies={supportedCurrencies} onSelectCurrency={this.onSelectCurrency.bind(this)} hideCurrencySelector={this.hideCurrencySelector.bind(this)} />
			)}
			</>
		)
	}
}

export default Home;