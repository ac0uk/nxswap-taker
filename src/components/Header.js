import React from 'react';
import {
	Link
} from "react-router-dom";

import { useNXBackupContext } from "../contexts/NXBackupContext.js"

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
	const { backupConnecting, backupConnected, backupRequiresDecryption, backupRequiresEncryption } = useNXBackupContext();
	let linkClass = (backupConnecting) ? "disabled" : "";

	if (backupConnecting || (!backupConnected && !backupRequiresDecryption && !backupRequiresEncryption)) {
		return (
			<Link to="/backup" className={`circled ${linkClass}`}>Get Started</Link>
		)
	} else if (backupRequiresEncryption) {
		return (
			<>
				<Link to="/backup" className={`circled ${linkClass}`}>Finish Backup</Link>
				<Link to="/track" className={`disabled ${linkClass}`}>Track Your Swaps</Link>
			</>
		)
	} else if (backupRequiresDecryption) {
		return (
			<>
				<Link to="/backup" className={`circled ${linkClass}`}>Decrypt Backup</Link>
				<Link to="/track" className={`disabled ${linkClass}`}>Track Your Swaps</Link>
			</>
		)
	} else if (backupConnected) {
		return (
			<>
				<Link to="/backup" className={`${linkClass}`}>Manage Backup</Link>
				<Link to="/track" className={`circled ${linkClass}`}>Track Your Swaps</Link>
			</>
		)
	}
}

export default Header;