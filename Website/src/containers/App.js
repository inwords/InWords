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
import GamePage from './Game/GamePage';
import ProfilePage from './Profile/ProfilePage';
//import GamesInfoField from '../components/Game/GamesInfoField';

function App({ accessToken }) {
    return (
        <Fragment>
            <ErrorAlertContainer />
            <Router history={history}>
                <Switch>
                    <RegularAppBarContainer>
                        <Route exact path="/" render={() =>
                            !accessToken ?
                                <Redirect to="login" /> :
                                <Redirect to="wordlist" />} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/wordlist" component={WordlistPage} />
                        <Route exact path="/games" component={GamePage} />
                        <Route path="/profile" component={ProfilePage} />
                    </RegularAppBarContainer>
                </Switch>
            </Router>
        </Fragment>
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
