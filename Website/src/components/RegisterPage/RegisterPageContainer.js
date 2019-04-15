import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userApiActions from '../../actions/userApiActions';
import { AppBarContext } from '../../contexts/AppBarContext';
import RegisterPage from './RegisterPage';

function RegisterPageContainer({ register }) {
    const { resetAppBar } = React.useContext(AppBarContext);

    React.useEffect(() => {
        resetAppBar({ title: 'Регистрация' });
    }, []);

    const [values, setValues] = React.useState({
        email: '',
        password: ''
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

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
