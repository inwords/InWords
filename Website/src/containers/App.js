import React, { Fragment } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../history/history';
import ErrorAlertContainer from './ErrorAlertContainer';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import WordlistContainer from './Wordlist/WordlistContainer';
import GameLevelsContainer from './Game/GameLevelsContainer';
import GameFieldContainer from './Game/GameFieldContainer';
import ProfileContainer from './Profile/ProfileContainer';
import RegularAppBar from '../components/AppBar/RegularAppBar';
import Games from '../components/Game/Games';

function App({ userId }) {
    return (
        <Fragment>
            <ErrorAlertContainer />
            <Router history={history}>
                <Switch>
                    <RegularAppBar>
                        <Route exact path="/" render={() =>
                            !userId ?
                                <Redirect to="/login" /> :
                                <Redirect to="/wordlist" />} />
                        <Route path="/login" component={LoginContainer} />
                        <Route path="/register" component={RegisterContainer} />
                        <Route path="/wordlist" component={WordlistContainer} />
                        <Route exact path="/games" component={Games} />
                        <Route path="/games_catalog/game/:id" component={GameLevelsContainer} />
                        <Route path="/games_catalog/level/:id" component={GameFieldContainer} />
                        <Route path="/profile/:id" component={ProfileContainer} />
                    </RegularAppBar>
                </Switch>
            </Router>
        </Fragment>
    );
}

App.propTypes = {
    userId: PropTypes.number,
};

const mapStateToProps = store => {
    return {
        userId: store.access.userId
    };
};

export default connect(
    mapStateToProps
)(App);
