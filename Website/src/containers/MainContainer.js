import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../actions/UserActions';
import MainAutoRedirector from '../components/MainAutoRedirector';
import MainUserInfoReceiver from '../components/MainUserInfoReceiver';
import MainNavbar from '../components/MainNavbar';

class MainContainer extends Component {
    render() {
        const {
            accessToken,
            userInfo,
            isFetching,
            logoutAction,
            receiveUserInfoAction
        } = this.props;

        return (
            <Fragment>
                <MainAutoRedirector accessToken={accessToken} />
                <MainUserInfoReceiver
                    accessToken={accessToken}
                    receiveUserInfo={receiveUserInfoAction}
                />
                <MainNavbar
                    accessToken={accessToken}
                    avatarPath={userInfo.avatarPath}
                    isFetching={isFetching}
                    logout={logoutAction}
                    receiveUserInfo={receiveUserInfoAction}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        accessToken: store.accessToken,
        isFetching: store.isFetching,
        userInfo: store.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logoutAction: () => dispatch(UserActions.logout()),
        receiveUserInfoAction: () => dispatch(UserActions.receiveUserInfo())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContainer);
