import React, { Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ErrorAlertContainer from './ErrorAlertContainer';
import MainAppBarContainer from './MainAppBar/MainAppBarContainer';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import WordlistPage from './Wordlist/WordlistPage';
import GamePage from './Game/GamePage';
import ProfilePage from './Profile/ProfilePage';

function App() {
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
                    </MainAppBarContainer>
                </Switch>
            </Fragment>
        </HashRouter>
    );
}

export default App;
