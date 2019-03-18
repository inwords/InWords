import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../actions/UserActions';
import Login from '../components/Login';

class LoginPage extends Component {
    static propTypes = {
        redirect: PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired
    };

    state = {
        email: "",
        password: ""
    };

    handleChange = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    };

    handleSubmit = (event) => {
        this.props.login({
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
            <Login
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
        redirect: store.user.login.redirect
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (userdata) => dispatch(UserActions.login(userdata))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
