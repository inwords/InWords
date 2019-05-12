import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ContentContainer from '../ContentContainer';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 2,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

function ProfileSettingsPage({ values, handleChange, handleSubmit, classes }) {
    return (
        <ContentContainer size="sm">
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        autoFocus
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
                    <div className={classes.actions}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Сохранить
                        </Button>
                    </div>
                </form>
            </Paper>
        </ContentContainer>
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
