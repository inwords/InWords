import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../actions/UserActions';
import { ErrorMessageActions } from '../actions/ErrorMessageActions';
import WrapperWithErrorHandling from '../components/WrapperWithErrorHandling';
import Login from '../components/Login';

class LoginContainer extends Component {
    render() {
        const {
            login,
            loginAction,
            errorMessage,
            resetErrorMessageAction
        } = this.props;

        return (
            <WrapperWithErrorHandling
                errorMessage={errorMessage}
                resetErrorMessage={resetErrorMessageAction} >
                <Login
                    redirect={login.redirect}
                    login={loginAction}
                />
            </WrapperWithErrorHandling>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        login: store.user.login,
        errorMessage: store.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (userdata) => dispatch(UserActions.login(userdata)),
        resetErrorMessageAction: () => dispatch(ErrorMessageActions.resetErrorMessage())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
