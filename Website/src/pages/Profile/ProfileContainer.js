import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { receiveUserInfo as receiveUserInfoAction } from 'actions/userApiActions';
import Profile from './Profile';

function ProfileContainer({ match }) {
  const validUserId = useSelector(store => store.access.userId);
  const { userId, ...restUserInfo } = useSelector(store => store.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    const receiveUserInfo = userId => {
      dispatch(receiveUserInfoAction(userId));
    };

    const paramUserId = parseInt(match.params.userId);

    if (userId !== paramUserId) {
      receiveUserInfo(paramUserId);
    }
  }, [userId, match.params.userId, dispatch]);

  return (
    <Profile
      {...restUserInfo}
      editingAvailable={validUserId && validUserId === userId}
    />
  );
}

ProfileContainer.propTypes = {
  match: PropTypes.object.isRequired
};

export default ProfileContainer;
