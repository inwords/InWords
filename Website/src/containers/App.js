import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MainNavbarContainer from './MainNavbarContainer';
import WrapperWithErrorAlertContainer from './WrapperWithErrorAlertContainer';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import WordlistPage from './Wordlist/WordlistPage';
import GamePage from './Game/GamePage';
import AccountPage from './Account/AccountPage';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Fragment>
                    <MainNavbarContainer />
                    <Switch>
                        <WrapperWithErrorAlertContainer>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/wordlist" component={WordlistPage} />
                            <Route path="/game" component={GamePage} />
                            <Route path="/account" component={AccountPage} />
                        </WrapperWithErrorAlertContainer>
                    </Switch>
                </Fragment>
            </HashRouter>
        );
    }
}

export default App;
