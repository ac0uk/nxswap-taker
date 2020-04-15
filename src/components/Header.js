import React from 'react';
import {
	Link
} from "react-router-dom";

import { useNXRecoveryKeyContext } from "../contexts/NXRecoveryKeyContext.js"


function Header () {
	return (
		<div id="header">
			<div className="logo">
				<Link to="/"></Link>
			</div>
			<nav>
				<Link to="/how-it-works">How It Works</Link>
				<HeaderLinks />
				<a href="https://www.twitter.com/nxswap" rel="noopener noreferrer" target="_blank" className="twitter">&nbsp;</a>
			</nav>
		</div>
	)
}


function HeaderLinks() {
	const { recoveryKeyLoading, recoveryKeyRequiresDecryption, recoveryKeyLoaded } = useNXRecoveryKeyContext();
	let linkClass = (recoveryKeyLoading) ? "disabled" : "";

	if (recoveryKeyLoading || (!recoveryKeyRequiresDecryption && !recoveryKeyLoaded)) {
		return (
			<Link to="/get-started" className={`circled ${linkClass}`}>Get Started</Link>
		)
	} else if (recoveryKeyRequiresDecryption) {
		return (
			<>
				<Link to="/get-started" className={`circled ${linkClass}`}>Decrypt Backup</Link>
				<Link to="/track" className={`disabled ${linkClass}`}>Track Your Swaps</Link>
			</>
		)
	} else if (recoveryKeyLoaded) {
		return (
			<>
				<Link to="/wallet" className={`${linkClass}`}>Wallet</Link>
				<Link to="/track" className={`circled ${linkClass}`}>Track Your Swaps</Link>
			</>
		)
	}
}

export default Header;