import React, { useState, useEffect } from 'react';
import { Negotiator } from '../js/NXSwapTaker';

const NegotiatorContext = React.createContext();

const NegotiatorProvider = ({ children }) => {
	const [activeOutgoingProposals, setActiveOutgoingProposals] = useState(false);
	const [activeIncomingProposals, setActiveIncomingProposals] = useState(false);

	useEffect(() => {
    const Setup = async () => {

			Negotiator.on('activeOutgoingProposals', (state) => {
				setActiveOutgoingProposals(state);
      })
      Negotiator.on('activeIncomingProposals', (state) => {
				setActiveIncomingProposals(state);
			})
    };

    Setup();
	}, []);

	return (
		<NegotiatorContext.Provider
			value={{
        activeOutgoingProposals,
        activeIncomingProposals
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