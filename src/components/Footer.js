import React from 'react';
import {
	Link,
} from "react-router-dom";

class Footer extends React.Component {

	render() {
		let currentRepo = ( process.env.NODE_ENV === "production" ) ? `${process.env.REACT_APP_NOW_GITHUB_REPO}/${process.env.REACT_APP_NOW_GITHUB_COMMIT_REF}` : "DEV VERSION";
		let currentRepoURL = (process.env.NODE_ENV === "production" ) ? `https://www.github.com/nxswap/${process.env.REACT_APP_NOW_GITHUB_REPO}` : "https://www.github.com/nxswap/nxswap-taker";
		return (
			<div id="footer">
				<div className="max-width">
					<div className="left">
						<Link to="/about">About NXSwap</Link>
						<span>|</span>
						<Link to="/market-makers">Market Makers</Link>
						<span>|</span>
						<Link to="/support">Get Support</Link>
					</div>
					<div className="right">
						<Link to="/security">Security</Link>
						<span>|</span>
						<a href="https://www.github.com/nxswap/nxswap-taker" target="_blank" rel="noopener noreferrer">Open Source</a>
						<span>|</span>
						<a href={currentRepoURL}>{currentRepo}</a>
					</div>
				</div>
			</div>
		)
	}
}

export default Footer;