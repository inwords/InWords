import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userApiActions from '../actions/userApiActions';
import Login from '../components/Login';

function LoginPage({ login }) {
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

    return (
        <Login
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        login: userdata => dispatch(userApiActions.login(userdata))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(LoginPage);
