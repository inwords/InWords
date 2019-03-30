import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userApiActions } from '../actions/userApiActions';
import Register from '../components/Register';

function RegisterPage({ redirect, register }) {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = event => {
        register({
            Email: values.email,
            Password: values.password
        });
        event.preventDefault();
    };

    if (redirect) {
        return <Redirect to="/login" />;
    }

    return (
        <Register
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

RegisterPage.propTypes = {
    redirect: PropTypes.bool.isRequired,
    register: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        redirect: store.user.redirect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        register: userdata => dispatch(userApiActions.register(userdata))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage);
