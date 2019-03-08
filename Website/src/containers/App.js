import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import TopNavbarContainer from './TopNavbarContainer';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import WordlistContainer from './WordlistContainer';
import LearningContainer from './LearningContainer';
import UserInfoContainer from './UserInfoContainer';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Fragment>
                    <TopNavbarContainer />
                    <Switch>
                        <Route path="/login" component={LoginContainer} />
                        <Route path="/register" component={RegisterContainer} />
                        <Route path="/wordlist" component={WordlistContainer} />
                        <Route path="/learning" component={LearningContainer} />
                        <Route path="/user-info" component={UserInfoContainer} />
                    </Switch>
                </Fragment>
            </HashRouter>
        );
    }
}

export default App;
