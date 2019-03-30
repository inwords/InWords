import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userApiActions } from '../actions/userApiActions';
import Login from '../components/Login';

function LoginPage({ redirect, login }) {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = event => {
        login({
            Email: values.email,
            Password: values.password
        });
        event.preventDefault();
    };

    if (redirect) {
        return <Redirect to="/wordlist" />;
    }

    return (
        <Login
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

LoginPage.propTypes = {
    redirect: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        redirect: store.user.redirect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: userdata => dispatch(userApiActions.login(userdata))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
