import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import ErrorSnackbar from './ErrorSnackbar';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import WordlistContainer from './Wordlist/WordlistPage';
import GameLevelsContainer from './Game/GameLevelsContainer';
import GameFieldContainer from './Game/GameFieldContainer';
import ProfileContainer from './Profile/ProfilePage';
import RegularAppBar from './AppBar/CustomAppBar';
import Games from './Game/Games';

function App({ userId }) {
    return (
        <Fragment>
            <ErrorSnackbar />
            <Router history={history}>
                <Switch>
                    <RegularAppBar>
                        <Route exact path="/" render={() =>
                            !userId ?
                                <Redirect to="/login" /> :
                                <Redirect to="/wordlist" />} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/wordlist" component={WordlistContainer} />
                        <Route exact path="/games" component={Games} />
                        <Route path="/games/game/:id" component={GameLevelsContainer} />
                        <Route path="/games/level/:id" component={GameFieldContainer} />
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
