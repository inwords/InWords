import React from 'react';
import PropTypes from 'prop-types';
import useDialog from 'src/hooks/useDialog';
import Icon from 'src/components/core/Icon';
import Typography from 'src/components/core/Typography';
import Button from 'src/components/core/Button';
import Avatar from 'src/components/core/Avatar';
import AvatarEditDialog from './AvatarEditDialog';
import NicknameEditDialog from './NicknameEditDialog';
import EmailEditDialog from './EmailEditDialog';

import './Profile.scss';

function Profile({ avatarPath, nickname, email }) {
  const {
    open: openAvatar,
    handleOpen: handleOpenAvatar,
    handleClose: handleCloseAvatar
  } = useDialog();

  const {
    open: openNickname,
    handleOpen: handleOpenNickname,
    handleClose: handleCloseNickname
  } = useDialog();

  const {
    open: openEmail,
    handleOpen: handleOpenEmail,
    handleClose: handleCloseEmail
  } = useDialog();

  return (
    <div className="profile">
      <div className="profile-avatar-section">
        <Avatar alt="Аватар" src={avatarPath} className="profile-avatar" />
        <Button onClick={handleOpenAvatar} variant="text" color="primary">
          Изменить аватар
        </Button>
      </div>
      <div className="profile-personal-section">
        <Typography component="h1" variant="h3" className="profile-nickname">
          {nickname}
        </Typography>
        <Button onClick={handleOpenNickname} variant="text" color="primary">
          Изменить никнейм
        </Button>
        <div className="profile-personal-info">
          <div className="profile-personal-info-entry">
            <div className="profile-personal-info-entry-icon">
              <Icon color="action">email</Icon>
            </div>
            <div className="profile-personal-info-entry-content">
              <div className="profile-personal-info-value">
                <Typography
                  variant="body1"
                  className="profile-personal-info-value-text"
                >
                  {email}
                </Typography>
              </div>
              <div className="profile-personal-info-edit-button-container">
                <Button
                  onClick={handleOpenEmail}
                  variant="text"
                  color="primary"
                >
                  Изменить электронный адрес
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AvatarEditDialog open={openAvatar} handleClose={handleCloseAvatar} />
      <EmailEditDialog open={openEmail} handleClose={handleCloseEmail} />
      <NicknameEditDialog
        open={openNickname}
        handleClose={handleCloseNickname}
        nickname={nickname}
      />
    </div>
  );
}

Profile.propTypes = {
  nickname: PropTypes.string,
  avatarPath: PropTypes.string,
  email: PropTypes.string
};

export default Profile;
