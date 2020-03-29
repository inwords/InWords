import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeUserInfo } from 'src/actions/profileActions';
import { receiveUserInfo } from 'src/actions/profileApiActions';
import Icon from 'src/components/core/Icon';
import Typography from 'src/components/core/Typography';
import Avatar from 'src/components/core/Avatar';
import Paper from 'src/components/core/Paper';
import ControlledAvatarEditDialog from './ControlledAvatarEditDialog';
import ControlledNicknameEditDialog from './ControlledNicknameEditDialog';
import ControlledEmailEditDialog from './ControlledEmailEditDialog';
import ControlledAccountDeleteDialog from './ControlledAccountDeleteDialog';

import './Profile.scss';

function Profile() {
  const { nickname, avatarPath, account } = useSelector(store => store.profile);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!account.accountId) {
      (async () => {
        try {
          const data = await dispatch(receiveUserInfo());
          dispatch(initializeUserInfo(data));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить профиль' }));
        }
      })();
    }
  }, [account.accountId, dispatch]);

  return (
    <Fragment>
      <div className="profile-root">
        <div className="profile-avatar-section">
          <Avatar alt="Avatar" src={avatarPath} className="profile-avatar">
            A
          </Avatar>
          <ControlledAvatarEditDialog />
        </div>
        <div className="profile-personal-section">
          <Typography component="h1" variant="h3" className="profile-nickname">
            {nickname}
          </Typography>
          <ControlledNicknameEditDialog nickname={nickname} />
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
                    {account.email}
                  </Typography>
                </div>
                <ControlledEmailEditDialog />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Paper className="profile-footer">
        <ControlledAccountDeleteDialog nickname={nickname} />
      </Paper>
    </Fragment>
  );
}

export default Profile;
