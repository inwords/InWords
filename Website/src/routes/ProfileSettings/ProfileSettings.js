import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormPaper from 'src/components/FormPaper';

const ActionsContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled(Button)`
  margin-left: 16px;
`;

function ProfileSettings({ inputs, handleChange, handleSubmit }) {
  return (
    <FormPaper>
      <Typography component="h1" variant="h5">
        Настройки профиля
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="nickname"
          label="Никнейм"
          name="nickname"
          value={inputs.nickname}
          onChange={handleChange}
          required
          fullWidth
          variant="filled"
          margin="normal"
        />
        <TextField
          id="avatar-path"
          label="URL-адрес аватара"
          type="url"
          name="avatarPath"
          value={inputs.avatarPath}
          onChange={handleChange}
          fullWidth
          variant="filled"
          margin="normal"
        />
        <ActionsContainer>
          <Button component={Link} to="/profile">
            Отмена
          </Button>
          <SubmitButton type="submit" variant="contained" color="primary">
            Сохранить
          </SubmitButton>
        </ActionsContainer>
      </form>
    </FormPaper>
  );
}

ProfileSettings.propTypes = {
  inputs: PropTypes.exact({
    nickname: PropTypes.string.isRequired,
    avatarPath: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default ProfileSettings;
