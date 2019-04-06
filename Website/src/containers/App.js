import React, { Fragment } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../history/history';
import ErrorAlertContainer from './ErrorAlertContainer';
import RegularAppBarContainer from './AppBar/RegularAppBarContainer';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import WordlistPage from './Wordlist/WordlistPage';
import GamesPage from './Game/GamesPage';
import GameLevelsContainer from './Game/GameLevelsContainer';
import GameFieldContainer from './Game/GameFieldContainer';
import ProfilePage from './Profile/ProfilePage';

function App({ token }) {
    return (
        <Fragment>
            <ErrorAlertContainer />
            <Router history={history}>
                <Switch>
                    <RegularAppBarContainer>
                        <Route exact path="/" render={() =>
                            !token ?
                                <Redirect to="/login" /> :
                                <Redirect to="/wordlist" />} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/wordlist" component={WordlistPage} />
                        <Route exact path="/games_catalog" component={GamesPage} />
                        <Route path="/games_catalog/game/:id" component={GameLevelsContainer} />
                        <Route path="/games_catalog/level/:id" component={GameFieldContainer} />
                        <Route path="/profile/:id" component={ProfilePage} />
                    </RegularAppBarContainer>
                </Switch>
            </Router>
        </Fragment>
    );
}

App.propTypes = {
    token: PropTypes.string,
};

const mapStateToProps = store => {
    return {
        token: store.access.token
    };
};

export default connect(
    mapStateToProps
)(App);
