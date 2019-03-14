import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import WrapperWithErrorHandling from './WrapperWithErrorHandling';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import WordlistContainer from './WordlistContainer';
import GameContainer from './GameContainer';
import AccountPage from './AccountPage';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Fragment>
                    <MainNavbar />
                    <Switch>
                        <WrapperWithErrorHandling>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/wordlist" component={WordlistContainer} />
                            <Route path="/game" component={GameContainer} />
                            <Route path="/account" component={AccountPage} />
                        </WrapperWithErrorHandling>
                    </Switch>
                </Fragment>
            </HashRouter>
        );
    }
}

export default App;
