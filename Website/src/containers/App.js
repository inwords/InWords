import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import TopNavbarContainer from './TopNavbarContainer';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import WordlistContainer from './WordlistContainer';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div className="container">
                    <TopNavbarContainer />
                    <Switch>
                        <Route path="/login" component={LoginContainer} />
                        <Route path="/register" component={RegisterContainer} />
                        <Route path="/wordlist" component={WordlistContainer} />
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default App;
