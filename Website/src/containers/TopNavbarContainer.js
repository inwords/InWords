import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../actions/UserActions';
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
                <TopNavbar
                    accessToken={accessToken}
                    avatarPath={userInfo.avatarPath}
                    fetching={fetching}
                    logout={logoutAction}
                    receiveUserInfo={receiveUserInfoAction} />
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
