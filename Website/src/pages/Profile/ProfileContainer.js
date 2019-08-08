import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { receiveUserInfo as receiveUserInfoAction } from 'actions/userApiActions';
import Profile from './Profile';

function ProfileContainer({ match }) {
  const userId = useSelector(store => store.access.userId);
  const userInfo = useSelector(store => store.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    const receiveUserInfo = userId => {
      dispatch(receiveUserInfoAction(userId));
    };

    const paramUserId = parseInt(match.params.userId);

    if (userInfo.userId !== paramUserId) {
      receiveUserInfo(paramUserId);
    }
  }, [userInfo.userId, match.params.userId, dispatch]);

  return (
    <Profile
      userInfo={userInfo}
      editingAvailable={userId && userId === userInfo.userId}
    />
  );
}

ProfileContainer.propTypes = {
  match: PropTypes.object.isRequired
};

export default ProfileContainer;
