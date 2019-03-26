import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ErrorAlertContainer from './ErrorAlertContainer';
import MainAppBarContainer from './MainAppBar/MainAppBarContainer';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import WordlistPage from './Wordlist/WordlistPage';
import GamePage from './Game/GamePage';
import ProfilePage from './Profile/ProfilePage';
import ProfileSettingsPage from './Profile/ProfileSettingsPage';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Fragment>
                    <CssBaseline />
                    <ErrorAlertContainer />
                    <Switch>
                        <MainAppBarContainer>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/wordlist" component={WordlistPage} />
                            <Route path="/game" component={GamePage} />
                            <Route path="/profile" component={ProfilePage} />
                            <Route path="/settings" component={ProfileSettingsPage} />
                        </MainAppBarContainer>
                    </Switch>
                </Fragment>
            </HashRouter>
        );
    }
}

export default App;
