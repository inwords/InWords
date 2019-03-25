import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%',
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

function ProfileSettings({ nickName, avatarPath, handleChange, handleSubmit, classes }) {
    return (
        <Paper className={classes.paper}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                    required
                    id="nickName"
                    label="Никнейм"
                    className={classes.textField}
                    value={nickName}
                    onChange={handleChange('nickName')}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="avatarPath"
                    label="URL-адрес аватара"
                    className={classes.textField}
                    value={avatarPath}
                    onChange={handleChange('avatarPath')}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Сохранить
                </Button>
            </form>
        </Paper>
    );
}

ProfileSettings.propTypes = {
    nickName: PropTypes.string.isRequired,
    avatarPath: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSettings);
