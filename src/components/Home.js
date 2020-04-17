import React from 'react';

function Home(props) {

	return (
		<div className="singlecolumn">
			<h1>Make your next Swap an Atomic Swap. testnet!</h1>
			<h2>Using NXSwap, your swaps are truly non-custodial</h2>
			<div className="swapstartform">
				<div className="depositCurrency">
					<img src="/img/currencies/btc.svg" alt="" />
					<small><span>Swap</span><strong>Bitcoin</strong></small>
					<input type="text" defaultValue="0.1" />
				</div>
				<div className="arrow">
					<img src="/img/arrow-right.png" alt="" />
				</div>
				<div className="receiveCurrency">
					<img src="/img/currencies/vtc.svg" alt="" />
					<small><span>For</span><strong>Vertcoin</strong></small>
					<input type="text" defaultValue="4444444444.44" />
				</div>
			</div>
			<div className="swapstartformsubmit">
				<button>Continue</button>
			</div>
		</div>
	)
}

export default Home;