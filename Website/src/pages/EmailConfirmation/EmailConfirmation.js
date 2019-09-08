import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2, 3, 3)
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
          Подтверждение email
        </Typography>
        <Typography component="p" variant="body2">
          На указанный email было отправлено письмо с подтверждением. Введите код
          из письма или перейдите по ссылке активации в письме.
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
          <Grid container justify="flex-end">
            <Grid item>
              <Tooltip
                title="Подтвердить email необходимо в течение 24 часов"
                placement="left"
              >
                <Link component={RouterLink} to="/profile" variant="body2">
                  Подтвердить позже
                </Link>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/emailChanging" variant="body2">
                Изменить email
              </Link>
            </Grid>
          </Grid>
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
