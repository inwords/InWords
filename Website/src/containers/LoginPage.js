import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../actions/UserActions';
import Login from '../components/Login';

function LoginPage({ redirect, login }) {
    const handleSubmit = userdata => event => {
        login(userdata);
        event.preventDefault();
    };

    if (redirect) {
        return <Redirect to="/wordlist" />;
    }

    return <Login handleSubmit={handleSubmit} />;
}

LoginPage.propTypes = {
    redirect: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        redirect: store.user.login.redirect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: userdata => dispatch(UserActions.login(userdata))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
