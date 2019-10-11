import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { receiveUserInfoById } from 'src/actions/userApiActions';
import Profile from './Profile';

function ProfileContainer({ match }) {
  const validUserId = useSelector(store => store.access.userId);
  const { userId, avatarPath, nickname, experience } = useSelector(
    store => store.userInfo
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const paramUserId = +match.params.userId;

    if (userId !== paramUserId) {
      dispatch(receiveUserInfoById(paramUserId));
    }
  }, [userId, match.params.userId, dispatch]);

  return (
    <Profile
      avatarPath={avatarPath}
      nickname={nickname}
      experience={experience}
      editingAvailable={validUserId && validUserId === userId}
    />
  );
}

ProfileContainer.propTypes = {
  match: PropTypes.object.isRequired
};

export default ProfileContainer;
