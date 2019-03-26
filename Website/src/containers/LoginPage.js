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

    handleSubmit = userdata => event => {
        this.props.login(userdata);
        event.preventDefault();
    };

    render() {
        const { redirect } = this.props;

        if (redirect) {
            return <Redirect to="/wordlist" />;
        }

        return <Login handleSubmit={this.handleSubmit} />;
    }
}

const mapStateToProps = store => {
    return {
        redirect: store.user.login.redirect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: userdata => dispatch(UserActions.login(userdata))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
