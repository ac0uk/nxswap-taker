import React from 'react';
import {
	Link
} from "react-router-dom";

import { useNXRecoveryKeyContext } from "../contexts/NXRecoveryKeyContext.js"


function Header () {
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
	const { recoveryKeyLoading, recoveryKeyRequiresDecryption, recoveryKeyLoaded } = useNXRecoveryKeyContext();
	let linkClass = (recoveryKeyLoading) ? "disabled" : "";

	if (recoveryKeyLoading || (!recoveryKeyRequiresDecryption && !recoveryKeyLoaded)) {
		return (
			<Link to="/get-started" className={`featured ${linkClass}`}>Get Started</Link>
		)
	} else if (recoveryKeyRequiresDecryption) {
		return (
			<>
				<Link to="/get-started" className={`featured ${linkClass}`}>Decrypt Backup</Link>
				<Link to="/track" className={`disabled ${linkClass}`}>Track Your Swaps</Link>
			</>
		)
	} else if (recoveryKeyLoaded) {
		return (
			<>
				<Link to="/wallet" className={`${linkClass}`}>Wallet</Link>
				<Link to="/track" className={`featured ${linkClass}`}>Track Your Swaps</Link>
			</>
		)
	}
}

export default Header;