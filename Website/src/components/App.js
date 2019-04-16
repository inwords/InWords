import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import TopAppBar from './TopAppBar';
import ErrorSnackbar from './ErrorSnackbar';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import WordlistContainer from './WordlistPage';
import GameLevelsContainer from './GameLevelsPage/GameLevels';
import GameFieldContainer from './Game/GameField';
import ProfilePage from './ProfilePage';
import ProfileSettingsPage from './ProfileSettingsPage';
import GamesPage from './GamesPage/GamesPage';
import GamePackCreationPage from './GamePackCreationPage';

function App({ userId }) {
    return (
        <Fragment>
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
                        <Route path="/wordlist" component={WordlistContainer} />
                        <Route exact path="/games" component={GamesPage} />
                        <Route path="/games/game/:id" component={GameLevelsContainer} />
                        <Route path="/games/level/:id" component={GameFieldContainer} />
                        <Route path="/game_pack_creation" component={GamePackCreationPage} />
                        <Route exact path="/profile" render={() => <Redirect to={`/profile/${userId}`} />} />
                        <Route path="/profile/:id" component={ProfilePage} />
                        <Route path="/profile_settings" component={ProfileSettingsPage} />
                    </TopAppBar>
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
