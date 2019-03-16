import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import WrapperWithErrorAlert from './WrapperWithErrorAlert';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import WordlistPage from './WordlistPage';
import GamePage from './GamePage';
import AccountPage from './AccountPage';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Fragment>
                    <MainNavbar />
                    <Switch>
                        <WrapperWithErrorAlert>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/wordlist" component={WordlistPage} />
                            <Route path="/game" component={GamePage} />
                            <Route path="/account" component={AccountPage} />
                        </WrapperWithErrorAlert>
                    </Switch>
                </Fragment>
            </HashRouter>
        );
    }
}

export default App;
