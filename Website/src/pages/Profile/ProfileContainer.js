import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveUserInfo as receiveUserInfoAction } from '../../actions/userApiActions';
import Profile from './Profile';

function ProfileContainer({ match }) {
    const userId = useSelector(store => store.access.userId);
    const userInfo = useSelector(store => store.userInfo);

    const dispatch = useDispatch();
    const receiveUserInfo = useCallback(
        userId => dispatch(receiveUserInfoAction(userId)),
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
            userInfo={userInfo}
            editingAvailable={userId && userId === userInfo.userId}
        />
    );
}

export default withRouter(ProfileContainer);
