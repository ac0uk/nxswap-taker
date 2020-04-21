import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import '../css/App.css';

import Header from './Header.js';
import Home from './Home.js';
import GetStarted from './GetStarted/GetStarted';
import Wallet from './Wallet/Wallet';
import Footer from './Footer.js';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div id="app">
          <Header />
          <div id="content">
            <Switch>
              <Route path="/get-started"><GetStarted /></Route>
              <Route path="/wallet"><Wallet /></Route>
              <Route path="/track">track</Route>
              <Route path="/"><Home /></Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;