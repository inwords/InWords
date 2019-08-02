import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateUserInfo as updateUserInfoAction } from 'actions/userApiActions';
import useForm from 'hooks/useForm';
import withReceivedUserInfo from './withReceivedUserInfo';
import ProfileSettings from './ProfileSettings';

function ProfileSettingsContainer({ userInfo }) {
  const dispatch = useDispatch();
  const updateUserInfo = useCallback(
    userInfo => dispatch(updateUserInfoAction(userInfo)),
    [dispatch]
  );

  const { inputs, handleChange, handleSubmit } = useForm(
    {
      nickName: userInfo.nickName,
      avatarPath: userInfo.avatarPath,
    },
    () => updateUserInfo(inputs)
  );

  return (
    <ProfileSettings
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

ProfileSettingsContainer.propTypes = {
  userInfo: PropTypes.shape({
    nickName: PropTypes.string.isRequired,
    avatarPath: PropTypes.string.isRequired,
  }).isRequired,
};

export default withReceivedUserInfo(ProfileSettingsContainer);
