import React, { useState, useEffect } from 'react';
import { Negotiator } from '../js/NXSwapTaker';

const NegotiatorContext = React.createContext();

const NegotiatorProvider = ({ children }) => {
	const [activeProposals, setActiveProposals] = useState(false);

	useEffect(() => {
    const Setup = async () => {

			Negotiator.on('activeProposals', (state) => {
				setActiveProposals(state);
      })
    };

    Setup();
	}, []);

	return (
		<NegotiatorContext.Provider
			value={{
        activeProposals
			}}
		>
			{children}
		</NegotiatorContext.Provider>
	);
}

function useNegotiatorContext() {
	const context = React.useContext(NegotiatorContext)
	if (context === undefined) {
		throw new Error('NegotiatorContext must be used within a NegotiatorProvider')
	}
	return context
}

export { NegotiatorProvider, useNegotiatorContext, NegotiatorContext, Negotiator }