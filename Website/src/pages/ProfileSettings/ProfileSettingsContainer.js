import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from 'actions/userApiActions';
import useForm from 'hooks/useForm';
import withReceivedUserInfo from './withReceivedUserInfo';
import ProfileSettings from './ProfileSettings';

function ProfileSettingsContainer({ nickname, avatarPath, ...rest }) {
  const dispatch = useDispatch();

  const { inputs, handleChange, handleSubmit } = useForm(
    {
      nickname: nickname,
      avatarPath: avatarPath
    },
    () => {
      dispatch(updateUserInfo(inputs));
    }
  );

  return (
    <ProfileSettings
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      {...rest}
    />
  );
}

ProfileSettingsContainer.propTypes = {
  nickname: PropTypes.string.isRequired,
  avatarPath: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default withReceivedUserInfo(ProfileSettingsContainer);
