import React from 'react';
import {
	Link
} from "react-router-dom";

import { NXContext } from "../contexts/NXContext.js"

class Header extends React.Component {

	HeaderLinks () {
		const { backupConnecting, backupConnected, backupRequiresDecryption, backupRequiresEncryption } = this.context;
		let linkClass = ( backupConnecting ) ? "disabled" : "";

		if( backupConnecting || ( ! backupConnected && ! backupRequiresDecryption && ! backupRequiresEncryption ) ) {
			return (
				<Link to="/backup" className={`circled ${linkClass}`}>Get Started</Link>
			)
		} else if( backupRequiresEncryption ) {
			return (
				<>
				<Link to="/backup" className={`circled ${linkClass}`}>Finish Backup</Link>
				<Link to="/track" className={`disabled ${linkClass}`}>Track Your Swaps</Link>
				</>
			)
		} else if( backupRequiresDecryption ) {
			return (
				<>
				<Link to="/backup" className={`circled ${linkClass}`}>Decrypt Backup</Link>
				<Link to="/track" className={`disabled ${linkClass}`}>Track Your Swaps</Link>
				</>
			)
		} else if( backupConnected ) {
			return (
				<>
				<Link to="/backup" className={`${linkClass}`}>Manage Backup</Link>
				<Link to="/track" className={`circled ${linkClass}`}>Track Your Swaps</Link>
				</>
			)
		}

	


		/*
		if( ! backupConnected ) {
			backupLink = false;
			trackLink = ( <Link to="/backup" className={`circled ${backupLinkClass}`}>Get Started</Link> )
		} else {
			backupLink = ( <Link to="/backup/manage">Manage Backup</Link> )
			trackLink = ( <Link to="/track" className="circled">Track Your Swaps</Link> )
		}*/
	}

  render() {				
		let HeaderLinks = this.HeaderLinks()
    return (
			<div id="header">
				<div className="logo">
					<Link to="/"></Link>
				</div>
				<nav>
					<Link to="/how-it-works">How It Works</Link>
					{HeaderLinks}
					<a href="https://www.twitter.com/nxswap" rel="noopener noreferrer" target="_blank" className="twitter">&nbsp;</a>
				</nav>
			</div>
		)
  }
}

Header.contextType = NXContext;
export default Header;