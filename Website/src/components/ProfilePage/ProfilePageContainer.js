import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import userApiActions from '../../actions/userApiActions';
import { AppBarContext } from '../TopAppBar/AppBarContext';
import Profile from './ProfilePage';

function ProfilePageContainer({ userId, userInfo, receiveUserInfo, match }) {
    const { resetAppBar } = React.useContext(AppBarContext);

    React.useEffect(() => {
        resetAppBar({
            title: 'Профиль'
        });
    }, []);

    React.useEffect(() => {
        if (userInfo.userId !== parseInt(match.params.userId)) {
            receiveUserInfo(parseInt(match.params.userId));
        }
    }, [match.params.userId]);

    return (
        <Profile
            editingAvailable={userId === userInfo.userId}
            userInfo={userInfo}
        />
    );
}

ProfilePageContainer.propTypes = {
    userId: PropTypes.number.isRequired,
    userInfo: PropTypes.shape({
        userId: PropTypes.number,
    }).isRequired,
    receiveUserInfo: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
};

const mapStateToProps = store => {
    return {
        userId: store.access.userId,
        userInfo: store.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        receiveUserInfo: userId => dispatch(userApiActions.receiveUserInfo(userId))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePageContainer));
