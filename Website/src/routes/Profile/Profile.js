import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import useDialog from 'src/hooks/useDialog';
import EmailEditDialog from './EmailEditDialog';
import NicknameEditDialog from './NicknameEditDialog';

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

const ProfilePersonalSection = styled(ProfileSection)`
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

const ControlButton = styled.span`
  cursor: pointer;
  user-select: none;
  color: ${props => props.theme.palette.primary.main};
  transition: ${props =>
    props.theme.transitions.create('color', {
      duration: props.theme.transitions.duration.shortest
    })};

  &:hover,
  &:active {
    color: ${props => props.theme.palette.secondary.main};
  }
`;

const AvatarControlButton = styled(ControlButton)`
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
    open: open1,
    handleOpen: handleOpen1,
    handleClose: handleClose1
  } = useDialog();

  const {
    open: open2,
    handleOpen: handleOpen2,
    handleClose: handleClose2
  } = useDialog();

  return (
    <ProfileRoot>
      <ProfilePictureSection>
        <ProfilePicture
          alt="Изображение профиля"
          src={
            'https://i.pinimg.com/originals/4a/8c/59/4a8c590f714f67d0dc6c50e34b1e469a.jpg'
          }
        />
        <AvatarControlButton>Изменить аватар</AvatarControlButton>
      </ProfilePictureSection>
      <ProfilePersonalSection>
        <NicknameText>{nickname}</NicknameText>
        <ControlButton onClick={handleOpen2}>Изменить никнейм</ControlButton>
        <SecondaryProfileInfo>
          <PersonalInfoContainer>
            <PersonalInfo>
              <PersonalInfoText>{email}</PersonalInfoText>
            </PersonalInfo>
            <PersonalEditLinks>
              <ControlButton onClick={handleOpen1}>
                Изменить электронный адрес
              </ControlButton>
            </PersonalEditLinks>
          </PersonalInfoContainer>
        </SecondaryProfileInfo>
      </ProfilePersonalSection>
      <EmailEditDialog open={open1} handleClose={handleClose1} />
      <NicknameEditDialog
        open={open2}
        handleClose={handleClose2}
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
