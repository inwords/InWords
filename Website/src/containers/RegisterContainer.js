import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../actions/UserActions';
import { ErrorActions } from '../actions/ErrorActions';
import { RegisterPage } from '../components/RegisterPage';

class RegisterContainer extends Component {
    render() {
        const { register, registerAction, errorMessage, resetErrorMessageAction } = this.props;
        
        return (
            <div className="container">
                <RegisterPage redirect={register.redirect} register={registerAction}
                    errorMessage={errorMessage} resetErrorMessage={resetErrorMessageAction} />
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        register: store.user.register,
        errorMessage: store.errorMessage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        registerAction: userdata => dispatch(UserActions.register(userdata)),
        resetErrorMessageAction: () => dispatch(ErrorActions.resetErrorMessage())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterContainer);
