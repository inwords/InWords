import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../actions/UserActions';
import Register from '../components/Register';

function RegisterPage({ redirect, register }) {
    const handleSubmit = userdata => event => {
        register(userdata);
        event.preventDefault();
    };

    if (redirect) {
        return <Redirect to="/wordlist" />;
    }

    return <Register handleSubmit={handleSubmit} />;
}

RegisterPage.propTypes = {
    redirect: PropTypes.bool.isRequired,
    register: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        redirect: store.user.register.redirect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        register: userdata => dispatch(UserActions.register(userdata))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage);
