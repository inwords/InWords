import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import TopNavbarContainer from './TopNavbarContainer';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import WordlistContainer from './WordlistContainer';

class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
                    <link href="/site-ico76.png" rel="apple-touch-icon" />
                    <link href="/site-ico76.png" rel="apple-touch-icon" sizes="76x76" />
                    <link href="/site-ico120.png" rel="apple-touch-icon" sizes="120x120" />
                    <link href="/site-ico152.png" rel="apple-touch-icon" sizes="152x152" />
                </header>
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
            </div>
        );
    }
}

export default App;
