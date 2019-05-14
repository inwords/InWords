import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import TopAppBar from './TopAppBar';
import ErrorSnackbar from './ErrorSnackbar';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import WordlistPage from './WordlistPage';
import GameLevelsPage from './GameLevelsPage';
import GameFieldPage from './GameFieldPage';
import ProfilePage from './ProfilePage';
import ProfileSettingsPage from './ProfileSettingsPage';
import GamesPage from './GamesPage';
import GamePackCreationPage from './GamePackCreationPage';

function App({ userId }) {
    return (
        <>
            <ErrorSnackbar />
            <Router history={history}>
                <Switch>
                    <TopAppBar>
                        <Route exact path="/" render={() =>
                            !userId ?
                                <Redirect to="/login" /> :
                                <Redirect to="/wordlist" />} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/wordlist" component={WordlistPage} />
                        <Route path="/games/:value" component={GamesPage} />
                        <Route path="/game_pack_creation" component={GamePackCreationPage} />
                        <Route path="/game/:gameId" component={GameLevelsPage} />
                        <Route path="/game_level/:levelId" component={GameFieldPage} />
                        <Route exact path="/profile" render={() => <Redirect to={`/profile/${userId}`} />} />
                        <Route path="/profile/:userId" component={ProfilePage} />
                        <Route path="/profile_settings" component={ProfileSettingsPage} />
                    </TopAppBar>
                </Switch>
            </Router>
        </>
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
