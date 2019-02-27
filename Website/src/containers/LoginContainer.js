import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../actions/UserActions';
import { LoginPage } from '../components/LoginPage';

class LoginContainer extends Component {
    render() {
        const { login, loginAction } = this.props;
        return (
            <div className="container">
                <LoginPage redirect={login.redirect} error={login.error}
                    login={loginAction} />
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        login: store.login
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loginAction: userdata => dispatch(UserActions.login(userdata))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
