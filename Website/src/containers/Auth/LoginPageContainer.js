import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userApiActions from '../../actions/userApiActions';
import LoginPage from '../../components/Auth/LoginPage';
import useSimpleValues from '../../hooks/useSimpleValues';

function LoginPageContainer({ login }) {
    const [values, handleChange] = useSimpleValues({
        email: '',
        password: ''
    });

    const handleSubmit = event => {
        login(values);
        event.preventDefault();
    };

    return (
        <LoginPage
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

LoginPageContainer.propTypes = {
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
)(LoginPageContainer);
