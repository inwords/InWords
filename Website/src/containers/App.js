import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ErrorAlertContainer from './ErrorAlertContainer';
import MainAppBarContainer from './MainAppBar/MainAppBarContainer';
import PageContainer from '../components/PageContainer';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import WordlistPage from './Wordlist/WordlistPage';
import GamePage from './Game/GamePage';
import AccountPage from './Account/AccountPage';
import AccountSettingsPage from './Account/AccountSettingsPage';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Fragment>
                    <ErrorAlertContainer /> 
                    <Switch>
                        <MainAppBarContainer>
                            <PageContainer>
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/wordlist" component={WordlistPage} />
                                <Route path="/game" component={GamePage} />
                                <Route path="/account" component={AccountPage} />
                                <Route path="/settings" component={AccountSettingsPage} />
                            </PageContainer>
                        </MainAppBarContainer>
                    </Switch>
                </Fragment>
            </HashRouter>
        );
    }
}

export default App;
