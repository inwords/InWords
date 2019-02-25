import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TopNavbarContainer from './TopNavbarContainer';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import WordlistContainer from './WordlistContainer';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <TopNavbarContainer />
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route path="/register" component={RegisterContainer} />
            <Route path="/wordlist" component={WordlistContainer} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
