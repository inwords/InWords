import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const ProfileCard = styled(Card)`
  max-width: 240px;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
`;

const ProfileCardMedia = styled(CardMedia)`
  height: 0;
  padding-top: 100%;
`;

function Profile({ avatarPath, nickname, editingAvailable }) {
  return (
    <Fade in>
      <ProfileCard>
        {avatarPath && <ProfileCardMedia image={avatarPath} title="Avatar" />}
        <CardContent>
          <Typography component="h2" variant="h5">
            {nickname}
          </Typography>
        </CardContent>
        <CardActions>
          {editingAvailable && (
            <Button
              component={Link}
              to="/profileSettings"
              size="small"
              color="primary"
            >
              Редактировать
            </Button>
          )}
        </CardActions>
      </ProfileCard>
    </Fade>
  );
}

Profile.propTypes = {
  nickname: PropTypes.string.isRequired,
  avatarPath: PropTypes.string.isRequired,
  editingAvailable: PropTypes.bool.isRequired
};

export default Profile;
