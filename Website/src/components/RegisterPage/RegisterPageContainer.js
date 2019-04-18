import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userApiActions from '../../actions/userApiActions';
import { AppBarContext } from '../TopAppBar/AppBarContext';
import useForm from '../../hooks/useForm';
import RegisterPage from './RegisterPage';

function RegisterPageContainer({ register }) {
    const { resetAppBar } = React.useContext(AppBarContext);

    React.useEffect(() => {
        resetAppBar({ title: 'Регистрация' });
    }, []);

    const { values, handleChange, handleSubmit } = useForm({
        email: '',
        password: ''
    }, () => register(values));

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
