import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2, 3, 3),
    },
    form: {
        width: '100%',
    },
    actions: {
        marginTop: theme.spacing(3),
    },
}));

function ProfileSettings({ inputs, handleChange, handleSubmit }) {
    const classes = useStyles();

    return (
        <Container component="div" maxWidth="sm">
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <TextField
                        variant="filled"
                        margin="normal"
                        fullWidth
                        required
                        label="Никнейм"
                        autoFocus
                        name="nickName"
                        value={inputs.nickName}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        fullWidth
                        label="URL-адрес аватара"
                        type="url"
                        name="avatarPath"
                        value={inputs.avatarPath}
                        onChange={handleChange}
                    />
                    <Grid
                        container
                        justify="flex-end"
                        spacing={2}
                        className={classes.actions}
                    >
                        <Grid item>
                            <Button color="primary" href="#profile">
                                Отменить
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Сохранить
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

ProfileSettings.propTypes = {
    inputs: PropTypes.shape({
        nickName: PropTypes.string.isRequired,
        avatarPath: PropTypes.string.isRequired
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default ProfileSettings;
