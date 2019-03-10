import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MainContainer from './MainContainer';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import WordlistContainer from './WordlistContainer';
import GameContainer from './GameContainer';
import UserInfoContainer from './UserInfoContainer';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Fragment>
                    <MainContainer />
                    <Switch>
                        <Route path="/login" component={LoginContainer} />
                        <Route path="/register" component={RegisterContainer} />
                        <Route path="/wordlist" component={WordlistContainer} />
                        <Route path="/game" component={GameContainer} />
                        <Route path="/user_info" component={UserInfoContainer} />
                    </Switch>
                </Fragment>
            </HashRouter>
        );
    }
}

export default App;
