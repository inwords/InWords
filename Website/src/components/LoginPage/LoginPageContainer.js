import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userApiActions from '../../actions/userApiActions';
import { AppBarContext } from '../TopAppBar/AppBarContext';
import LoginPage from './LoginPage';

function LoginPageContainer({ login }) {
    const { resetAppBar } = React.useContext(AppBarContext);

    React.useEffect(() => {
        resetAppBar({ title: 'Вход' });
    }, []);

    const [values, setValues] = React.useState({
        email: '',
        password: ''
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

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
