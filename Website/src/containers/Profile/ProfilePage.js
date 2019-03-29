import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../../actions/UserActions';
import Profile from '../../components/Profile/Profile';

function ProfilePage({ userInfo, receiveUserInfo }) {
    useEffect(() => {
        receiveUserInfo();
    }, []);

    return (
        <Profile userInfo={userInfo} />
    );
}

ProfilePage.propTypes = {
    userInfo: PropTypes.object.isRequired,
    receiveUserInfo: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        userInfo: store.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        receiveUserInfo: () => dispatch(UserActions.receiveUserInfo())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
