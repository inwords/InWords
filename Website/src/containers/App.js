import React, { Fragment } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../history/history';
import ErrorAlertContainer from './ErrorAlertContainer';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import WordlistPage from './Wordlist/WordlistPage';
import GamesPage from './Game/GamesPage';
import GameLevelsContainer from './Game/GameLevelsContainer';
import GameFieldContainer from './Game/GameFieldContainer';
import ProfilePage from './Profile/ProfilePage';
import RegularAppBar from '../components/AppBar/RegularAppBar';

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
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/wordlist" component={WordlistPage} />
                        <Route exact path="/games_catalog" component={GamesPage} />
                        <Route path="/games_catalog/game/:id" component={GameLevelsContainer} />
                        <Route path="/games_catalog/level/:id" component={GameFieldContainer} />
                        <Route path="/profile/:id" component={ProfilePage} />
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
