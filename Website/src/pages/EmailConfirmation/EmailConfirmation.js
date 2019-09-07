import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  links: {
    textAlign: 'right'
  }
}));

function EmailConfirmation({ inputs, handleChange, handleSubmit }) {
  const classes = useStyles();

  return (
    <Container component="div" maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Подтверждение Email
        </Typography>
        <Typography component="p" variant="body2">
          На указанный Email было отправлено письмо для активации. Введите код из
          письма или перейдите по ссылке активации в письме.
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            id="confirmationCode"
            label="Проверочный код"
            name="confirmationCode"
            value={inputs.confirmationCode}
            onChange={handleChange}
            required
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Подтвердить
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

EmailConfirmation.propTypes = {
  inputs: PropTypes.exact({
    confirmationCode: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default EmailConfirmation;
