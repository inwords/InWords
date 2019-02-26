import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopNavbarContainer from './TopNavbarContainer';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import WordlistContainer from './WordlistContainer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <TopNavbarContainer />
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route path="/register" component={RegisterContainer} />
            <Route path="/wordlist" component={WordlistContainer} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
