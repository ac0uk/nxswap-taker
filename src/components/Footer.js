import React from 'react';
import {
	Link,
} from "react-router-dom";

console.log(process.env);
console.log(process.env.REACT_APP_TEST);

class Footer extends React.Component {
	render() {
		return (
			<div id="footer">
				<div className="max-width">
					<div className="left">
						<Link to="/about">About NXSwap</Link>
						<span>|</span>
						<Link to="/market-makers">Market Makers</Link>
					</div>
					<div className="right">
						<Link to="/support">Get Support</Link>
						<span>|</span>
						<Link to="/security">Security</Link>
						<span>|</span>
						<a href="https://www.github.com/nxswap/nxswap-taker" target="_blank" rel="noopener noreferrer">Open Source</a>
					</div>
				</div>
			</div>
		)
	}
}

export default Footer;