import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    shell: {
        marginTop: theme.spacing.unit * 4,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        textAlign: 'end',
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

function ProfileSettingsPage({ values, handleChange, handleSubmit, classes }) {
    return (
        <div className={classes.root}>
            <Paper className={classes.shell}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        id="nickName"
                        label="Никнейм"
                        fullWidth
                        value={values.nickName}
                        onChange={handleChange('nickName')}
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        id="avatarPath"
                        label="URL-адрес аватара"
                        fullWidth
                        value={values.avatarPath}
                        onChange={handleChange('avatarPath')}
                        margin="normal"
                        variant="filled"
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
        </div>
    );
}

ProfileSettingsPage.propTypes = {
    values: PropTypes.shape({
        nickName: PropTypes.string.isRequired,
        avatarPath: PropTypes.string.isRequired
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSettingsPage);
