import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from 'src/actions/userApiActions';
import useForm from 'src/hooks/useForm';
import withReceivedUserInfo from 'src/components/withReceivedUserInfo';
import ProfileSettings from './ProfileSettings';

function ProfileSettingsContainer({ nickname, avatarPath }) {
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
    />
  );
}

ProfileSettingsContainer.propTypes = {
  nickname: PropTypes.string.isRequired,
  avatarPath: PropTypes.string.isRequired
};

export default withReceivedUserInfo(ProfileSettingsContainer);
