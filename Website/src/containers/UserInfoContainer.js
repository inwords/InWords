import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../actions/UserActions';
import { ErrorActions } from '../actions/ErrorActions';
import WrapperWithErrorHandling from '../components/WrapperWithErrorHandling';
import UserInfo from '../components/UserInfo';

class UserInfoContainer extends Component {
    render() {
        const {
            userInfo,
            changeUserInfoAction,
            errorMessage,
            resetErrorMessageAction
        } = this.props;

        return (
            <WrapperWithErrorHandling
                errorMessage={errorMessage}
                resetErrorMessage={resetErrorMessageAction} >
                <UserInfo
                    userInfo={userInfo}
                    changeUserInfo={changeUserInfoAction}
                />
            </WrapperWithErrorHandling>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        userInfo: store.user.userInfo,
        errorMessage: store.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserInfoAction: (userInfo) => dispatch(UserActions.changeUserInfo(userInfo)),
        resetErrorMessageAction: () => dispatch(ErrorActions.resetErrorMessage())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoContainer);
