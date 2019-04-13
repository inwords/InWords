import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userApiActions from '../../actions/userApiActions';
import useControlledInputValues from '../../hooks/useControlledInputValues';
import RegisterPage from './RegisterPage';

function RegisterPageContainer({ register }) {
    const [values, handleChange] = useControlledInputValues({
        email: '',
        password: ''
    });

    const handleSubmit = event => {
        register(values);
        event.preventDefault();
    };

    return (
        <RegisterPage
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

RegisterPageContainer.propTypes = {
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
)(RegisterPageContainer);
