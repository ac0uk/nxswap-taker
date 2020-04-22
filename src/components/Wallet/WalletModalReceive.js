import React from 'react';
import { Wallet } from '../../js/NXSwapTaker';
import { useWalletContext } from '../../contexts/WalletContext';

import '../../css/Modal.css';

function WalletModalReceive (props) {
  const { modalReceiveOpen, setModalReceiveOpen } = useWalletContext();
	let curr = modalReceiveOpen;
	if( ! curr ) {
		return ( <></> )
  }
  
  const onClickBG = (event) => {
    let target = event.target;
    let targetClass = target.getAttribute('class');

    if(targetClass === "modalWindowOverlay") {
      setModalReceiveOpen(false);
    }
  }

  let nextAddress = Wallet.getNextAddress(curr, false);

	return (
    <div className="modalWindowOverlay" id="test" onClick={(event) => {onClickBG(event)}} >
      <div className="modalWindow">
        <h2>Receive {curr}</h2>
        <strong>Fresh Address:</strong><br /><br />
        {nextAddress.nextAddress}
        <br /><br />see previous addresses
      </div>
    </div>
	)
}

export default WalletModalReceive;