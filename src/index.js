import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { RecoveryKeyProvider } from "./contexts/RecoveryKeyContext";
import { WalletProvider } from "./contexts/WalletContext";
import { NXWSProvider } from "./contexts/NXWSContext";

ReactDOM.render(
  <React.StrictMode>
    <RecoveryKeyProvider>
      <WalletProvider>
      <NXWSProvider>
      <App />
      </NXWSProvider>
      </WalletProvider>
    </RecoveryKeyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
