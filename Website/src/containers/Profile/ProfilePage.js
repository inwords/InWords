import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userApiActions from '../../actions/userApiActions';
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
        userInfo: store.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        receiveUserInfo: () => dispatch(userApiActions.receiveUserInfo())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
