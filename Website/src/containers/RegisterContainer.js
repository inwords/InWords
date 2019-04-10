import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userApiActions from '../actions/userApiActions';
import Register from '../components/Register';

function RegisterContainer({ register }) {
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

    return (
        <Register
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

RegisterContainer.propTypes = {
    register: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        register: userdata => dispatch(userApiActions.register(userdata))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(RegisterContainer);
