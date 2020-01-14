import React from 'react';
import PropTypes from 'prop-types';
import EmailIcon from '@material-ui/icons/Email';
import useDialog from 'src/hooks/useDialog';
import Typography from 'src/components/Typography';
import Button from 'src/components/Button';
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
      <div className="profile__picture-section">
        <img
          alt="Изображение профиля"
          src={avatarPath}
          className="profile__picture"
        />
        <Button onClick={handleOpenAvatar} variant="text" color="primary">
          Изменить аватар
        </Button>
      </div>
      <div className="profile__personal-section">
        <Typography component="h2" variant="h3" className="profile__nickname">
          {nickname}
        </Typography>
        <Button onClick={handleOpenNickname} variant="text" color="primary">
          Изменить никнейм
        </Button>
        <div className="profile__personal-info">
          <div className="profile__personal-info-entry">
            <div className="profile__personal-info-entry-icon">
              <EmailIcon color="action" />
            </div>
            <div className="profile__personal-info-entry-content">
              <div className="profile__personal-info-value">
                <Typography
                  variant="body1"
                  className="profile__personal-info-value-text"
                >
                  {email}
                </Typography>
              </div>
              <div className="profile__personal-info-edit-links">
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
  nickname: PropTypes.string.isRequired,
  avatarPath: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default Profile;
