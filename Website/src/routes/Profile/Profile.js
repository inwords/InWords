import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import useDialog from 'src/hooks/useDialog';
import LineButton from 'src/components/LineButton';
import AvatarEditDialog from './AvatarEditDialog';
import NicknameEditDialog from './NicknameEditDialog';
import EmailEditDialog from './EmailEditDialog';

const ProfileRoot = styled.div`
  display: flex;

  ${props => props.theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfilePictureSection = styled(ProfileSection)`
  align-items: center;
`;

const ProfilePicture = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfilePersonalSection = styled.div`
  width: 100%;
  padding-top: 16px;
  padding-left: 64px;
`;

const SecondaryProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const PersonalInfoContainer = styled.div`
  display: flex;
  margin: 12px 0;

  ${props => props.theme.breakpoints.down('xs')} {
    flex-direction: column;
  }
`;

const PersonalInfo = styled.div`
  width: 50%;
`;

const PersonalEditLinks = styled.div`
  width: 40%;
`;

const PersonalInfoText = styled.span`
  ${props => props.theme.typography.body1}

  ${props => props.theme.breakpoints.down('sm')} {
    ${props => props.theme.typography.body2}
  }
`;

const AvatarLineButton = styled(LineButton)`
  margin: 12px 0;
`;

const NicknameText = styled.h2`
  margin: 0 0 4px 0;
  ${props => props.theme.typography.h3}

  ${props => props.theme.breakpoints.down('sm')} {
    ${props => props.theme.typography.h4}
  }
`;

function Profile({ avatarPath, nickname, editingAvailable, email }) {
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
    <ProfileRoot>
      <ProfilePictureSection>
        <ProfilePicture alt="Изображение профиля" src={avatarPath} />
        <AvatarLineButton onClick={handleOpenAvatar}>
          Изменить аватар
        </AvatarLineButton>
      </ProfilePictureSection>
      <ProfilePersonalSection>
        <NicknameText>{nickname}</NicknameText>
        <LineButton onClick={handleOpenNickname}>Изменить никнейм</LineButton>
        <SecondaryProfileInfo>
          <PersonalInfoContainer>
            <PersonalInfo>
              <PersonalInfoText>{email}</PersonalInfoText>
            </PersonalInfo>
            <PersonalEditLinks>
              <LineButton onClick={handleOpenEmail}>
                Изменить электронный адрес
              </LineButton>
            </PersonalEditLinks>
          </PersonalInfoContainer>
        </SecondaryProfileInfo>
      </ProfilePersonalSection>
      <AvatarEditDialog open={openAvatar} handleClose={handleCloseAvatar} />
      <EmailEditDialog open={openEmail} handleClose={handleCloseEmail} />
      <NicknameEditDialog
        open={openNickname}
        handleClose={handleCloseNickname}
        nickname={nickname}
      />
    </ProfileRoot>
  );
}

Profile.propTypes = {
  nickname: PropTypes.string.isRequired,
  avatarPath: PropTypes.string.isRequired,
  editingAvailable: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired
};

export default Profile;
