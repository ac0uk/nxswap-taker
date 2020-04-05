import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { NXBackupProvider } from "./contexts/NXBackupContext.js";
import { NXWSProvider } from "./contexts/NXWSContext.js";

ReactDOM.render(
  <React.StrictMode>
    <NXBackupProvider>
      <NXWSProvider>
      <App />
      </NXWSProvider>
    </NXBackupProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
