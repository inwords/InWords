import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { AppBarContext } from '../../contexts/AppBarContext';
import SmallPageContentContainer from '../PageContentContainers/SmallPageContentContainer';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

function LoginPage({ values, handleChange, handleSubmit, classes }) {
    const { resetAppBar } = React.useContext(AppBarContext);

    React.useEffect(() => {
        resetAppBar({title: 'Вход'});
    }, []);

    return (
        <SmallPageContentContainer>
            <Paper className={classes.paper}>
                <Typography variant="h5">
                    Вход
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            value={values.email}
                            onChange={handleChange('email')}
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Пароль</InputLabel>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            value={values.password}
                            onChange={handleChange('password')}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Войти
                    </Button>
                </form>
            </Paper>
        </SmallPageContentContainer>
    );
}

LoginPage.propTypes = {
    values: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
