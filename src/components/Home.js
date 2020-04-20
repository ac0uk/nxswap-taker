import React from 'react';

import '../css/Swap.css';

function Home(props) {

	return (
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
						<span className="icon"><img src="/img/currencies/btc.svg" alt="btc" /></span>
						<span className="select">BTC</span>
					</div>
					<div className="amountfield">
						<label htmlFor="for_amount">For</label>
						<input type="text" id="for_amount" placeholder="0.00000000" />
						<span className="icon"><img src="/img/currencies/vtc.svg" alt="vtc" /></span>
						<span className="select">VTC</span>
					</div>
					<div className="buttonfield">
						<button className="swap">Swap</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home;