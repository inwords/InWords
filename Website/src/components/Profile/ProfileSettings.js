import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    root: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 4,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%',
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

function ProfileSettings({ defaultNickName, defaultAvatarPath, handleSubmit, classes }) {
    const [values, setValues] = useState({
        nickName: defaultNickName,
        avatarPath: defaultAvatarPath
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <form
                    onSubmit={handleSubmit({
                        NickName: values.nickName,
                        AvatarPath: values.avatarPath
                    })}
                    className={classes.form}
                >
                    <TextField
                        required
                        id="nickName"
                        label="Никнейм"
                        value={values.nickName}
                        onChange={handleChange('nickName')}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="avatarPath"
                        label="URL-адрес аватара"
                        value={values.avatarPath}
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
        </div>
    );
}

ProfileSettings.propTypes = {
    defaultNickName: PropTypes.string.isRequired,
    defaultAvatarPath: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSettings);
