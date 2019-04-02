import React, { Fragment } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import history from '../history/history';
import ErrorAlertContainer from './ErrorAlertContainer';
import MainAppBarContainer from './MainAppBar/MainAppBarContainer';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import WordlistPage from './Wordlist/WordlistPage';
import GamePage from './Game/GamePage';
import ProfilePage from './Profile/ProfilePage';

function App({ accessToken }) {
    return (
        <Router history={history}>
            <Fragment>
                <CssBaseline />
                <ErrorAlertContainer />
                <Switch>
                    <MainAppBarContainer>
                        <Route exact path="/" render={() =>
                            !accessToken ?
                                <Redirect to="login" /> :
                                <Redirect to="wordlist" />} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/wordlist" component={WordlistPage} />
                        <Route path="/game" component={GamePage} />
                        <Route path="/profile" component={ProfilePage} />
                    </MainAppBarContainer>
                </Switch>
            </Fragment>
        </Router>
    );
}

App.propTypes = {
    accessToken: PropTypes.string
};

const mapStateToProps = store => {
    return {
        accessToken: store.accessToken
    };
};

export default connect(
    mapStateToProps
)(App);
