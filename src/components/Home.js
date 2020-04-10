import React from 'react';
import { useNXWSContext } from "../contexts/NXWSContext.js"

function Home(props) {
	const { nxwsConnected, nxwsCurrencies } = useNXWSContext();
	console.log('connected:' + nxwsConnected);
	console.log(nxwsCurrencies);

	return (
		<div className="splitcolumn">
			<div className="blurb">
				<div className="blurby">
					<h1>Swap between Cryptocurrencies - test</h1>
					<h2>on our truly non-custodial platform.</h2>
					<h3>You no longer need to give up custody of your funds to a 3rd party service to trade the currencies we support.</h3>
					<div className="supported-icons">
						<img src="/img/currencies/btc.svg" alt="" />
						<img src="/img/currencies/ltc.svg" alt="" />
						<img src="/img/currencies/vtc.svg" alt="" />
						<img src="/img/currencies/grs.svg" alt="" />
						<img src="/img/currencies/dgb.svg" alt="" />
					</div>
					<h4>Using the power of Atomic Swaps, your funds are never exposed to risk and are always in your custody.</h4>
				</div>
			</div>
			<div className="formc">
				<div className="formb">
					<div id="swap_form_step_1" className="formi form_loading">
						<form method="post" id="form_swap_form_step_1">
							<span className="label">Swap</span>
							<div className="currency_select" id="selected_deposit_currency">
								<img className="icon" src="/img/currencies/ltc.svg" alt="" />
								<span className="name">Litecoin</span>
								<i></i>
							</div>
							<span className="label">For</span>
							<div className="currency_select" id="selected_receive_currency">
								<img className="icon" src="/img/currencies/btc.svg" alt="" />
								<span className="name">Bitcoin</span>
								<i></i>
							</div>
							<button className="submit">Continue</button>
						</form>
					</div>
					<div id="swap_form_step_2" className="formi form_hidden">
						<form method="post" id="form_swap_form_step_2">
							<strong>Please enter your <span className="selectedReceiveCurrencyName">x</span> address.</strong><p>This is where your currency will be sent once the Swap has completed.</p>
							<input type="text" name="swap_receive_address" defaultValue="tltc1qum926hw2envv08m0fqd6l6eueuwejdnz8hjmjl" /><br /><br />
							<strong>Please enter your <span className="selectedRefundCurrencyName">x</span> address.</strong><p>This is where your deposit will be refunded should your Swap not complete.</p>
							<input type="text" name="swap_refund_address" defaultValue="tb1q7l0m3q4c20ly9y668rff4yshha34chfgdgp0ls" /><br />
							<button className="submit">Continue</button>
						</form>
					</div>
					<div id="swap_form_step_3" className="formi form_hidden">
						<form method="post" id="form_swap_form_step_3">
							<strong>Please choose a password</strong><p>This will encrypt your Swap and keep your funds safe, please ensure you choose a secure password and store it safely. This password can not be recovered and losing it may result in loss of your funds.</p>

							<br /><br />
							<input type="text" name="swap_encrypt_password" defaultValue="password123" /><br /><br />
							<button className="submit">Submit</button>
						</form>
					</div>
					<div id="swap_form_created" className="formi form_hidden">
						Swap created! ID: <span className="createdSwapID"></span>

						<button className="downloadRecoveryKey" download>download recovery key</button>
					</div>
					<div id="swap_form_currency_selector">
						<ul>
							<li>test</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home;