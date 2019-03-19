import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../actions/UserActions';
import Register from '../components/Register';

class RegisterPage extends Component {
    static propTypes = {
        redirect: PropTypes.bool.isRequired,
        register: PropTypes.func.isRequired
    };

    state = {
        email: '',
        password: ''
    };

    handleChange = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    };

    handleSubmit = (event) => {
        this.props.register({
            Email: this.state.email,
            Password: this.state.password
        });

        event.preventDefault();
    };

    render() {
        const { redirect } = this.props;
        const { email, password } = this.state;

        if (redirect) {
            return <Redirect to="/wordlist" />;
        }

        return (
            <Register
                email={email}
                password={password}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        redirect: store.user.register.redirect
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (userdata) => dispatch(UserActions.register(userdata))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage);
