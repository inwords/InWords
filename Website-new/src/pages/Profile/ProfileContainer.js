import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import userApiActions from '../../actions/userApiActions';
import Profile from './Profile';

function ProfileContainer({ match }) {
    const userId = useSelector(store => store.access.userId);
    const userInfo = useSelector(store => store.userInfo);

    const dispatch = useDispatch();
    const receiveUserInfo = useCallback(
        userId => dispatch(userApiActions.receiveUserInfo(userId)),
        [dispatch]
    );

    useEffect(() => {
        const paramUserId = parseInt(match.params.userId);

        if (userInfo.userId !== paramUserId) {
            receiveUserInfo(paramUserId);
        }
    }, [userInfo.userId, match.params.userId, receiveUserInfo]);

    return (
        <Profile
            editingAvailable={userId === userInfo.userId}
            userInfo={userInfo}
        />
    );
}

export default withRouter(ProfileContainer);
