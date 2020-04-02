import React from 'react';
import {
	Link
} from "react-router-dom";

import { NXContext } from "../contexts/NXContext.js"

class Header extends React.Component {	
  render() {
		const { backupConnecting, backupConnected } = this.context
		
		let backupLink
		let trackLink
		
		let backupLinkClass = ( backupConnecting ) ? "disabled" : "";
		
		if( ! backupConnected ) {
			backupLink = ( <Link to="/backup" className={backupLinkClass}>Restore Backup</Link> )
			trackLink = ( <Link to="/backup" className={`circled ${backupLinkClass}`}>Get Started</Link> )
		} else {
			backupLink = ( <Link to="/backup/manage">Manage Backup</Link> )
			trackLink = ( <Link to="/track" className="circled">Track Your Swaps</Link> )
		}
				
    return (
			<div id="header">
				<div className="logo">
					<Link to="/"></Link>
				</div>
				<nav>
					<Link to="/how-it-works">How It Works</Link>
					{backupLink}
					{trackLink}
					<a href="https://www.twitter.com/nxswap" rel="noopener noreferrer" target="_blank" className="twitter">&nbsp;</a>
				</nav>
			</div>
		)
  }
}

Header.contextType = NXContext;
export default Header;