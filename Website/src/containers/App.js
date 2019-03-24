import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MainNavbarContainer from './MainNavbarContainer';
import PageContainer from '../components/PageContainer';
import ErrorAlertContainer from './ErrorAlertContainer';
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
                    <ErrorAlertContainer />
                    <Switch>
                        <MainNavbarContainer>
                            <PageContainer>
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/wordlist" component={WordlistPage} />
                                <Route path="/game" component={GamePage} />
                                <Route path="/account" component={AccountPage} />
                            </PageContainer>
                        </MainNavbarContainer>
                    </Switch>
                </Fragment>
            </HashRouter>
        );
    }
}

export default App;
