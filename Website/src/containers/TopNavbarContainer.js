import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../actions/UserActions';
import TopNavbarUserInfoReceiver from '../components/TopNavbarUserInfoReceiver';
import TopNavbar from '../components/TopNavbar';

class TopNavbarContainer extends Component {
    render() {
        const {
            accessToken,
            userInfo,
            fetching,
            logoutAction,
            receiveUserInfoAction } = this.props;

        return (
            <Fragment>
                <TopNavbarUserInfoReceiver
                    accessToken={accessToken}
                    receiveUserInfo={receiveUserInfoAction} />

                <TopNavbar
                    accessToken={accessToken}
                    avatarPath={userInfo.avatarPath}
                    fetching={fetching}
                    logout={logoutAction}
                    receiveUserInfo={receiveUserInfoAction} />

            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        accessToken: store.accessToken,
        fetching: store.fetching,
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
)(TopNavbarContainer);
