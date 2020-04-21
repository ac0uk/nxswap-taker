import React from 'react';
import {
	Link
} from "react-router-dom";

import { useRecoveryKeyContext } from "../contexts/RecoveryKeyContext.js"


function Header() {
	return (
		<div id="header">
			<div className="max-width">
				<div className="logo">
					<Link to="/"></Link>
				</div>
				<nav>
					<Link to="/how-it-works">How It Works</Link>
					<HeaderLinks />
					<a href="https://www.twitter.com/nxswap" rel="noopener noreferrer" target="_blank" className="twitter">&nbsp;</a>
				</nav>
			</div>
		</div>
	)
}


function HeaderLinks() {
	const { recoveryKeyLoading, recoveryKeyLocked, recoveryKeyLoaded } = useRecoveryKeyContext();
	let linkClass = (recoveryKeyLoading) ? "disabled" : "";

	if (recoveryKeyLoading || (!recoveryKeyLocked && !recoveryKeyLoaded)) {
		return (
			<Link to="/get-started" className={`featured ${linkClass}`}>Get Started</Link>
		)
	} else if (recoveryKeyLoaded && recoveryKeyLocked) {
		return (
			<>
				<Link to="/wallet/unlock" className={`featured ${linkClass}`}>Unlock Wallet</Link>
			</>
		)
	} else if (recoveryKeyLoaded && !recoveryKeyLocked) {
		return (
			<>
				<Link to="/wallet" className={`${linkClass}`}>Wallet</Link>
				<Link to="/track" className={`featured ${linkClass}`}>Track Your Swaps</Link>
				<Link to="/wallet/lock" className={linkClass}>Lock</Link>
			</>
		)
	} else {
		return (
			<></>
		)
	}
}

export default Header;