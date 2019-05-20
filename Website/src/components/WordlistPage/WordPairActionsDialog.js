import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    closeButton: {
        marginRight: 20,
    },
    content: {
        padding: theme.spacing.unit * 3,
        display: 'flex',
        justifyContent: 'center',
    },
    form: {
        marginTop: theme.spacing.unit,
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function WordPairActionsDialog(
    {
        title,
        open,
        handleClose,
        values,
        handleChange,
        handleSubmit,
        classes
    }
) {
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Close"
                        onClick={handleClose}
                        className={classes.closeButton}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        noWrap
                        variant="h6"
                        color="inherit"
                        className={classes.flex}
                    >
                        {title}
                    </Typography>
                    <Button type="submit" form="form" color="inherit">
                        Сохранить
                    </Button>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <form id="form" onSubmit={handleSubmit} className={classes.form}>
                    <TextField
                        autoFocus
                        required
                        id="wordForeign"
                        label="Слово или фраза"
                        fullWidth
                        value={values.wordForeign}
                        onChange={handleChange('wordForeign')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="wordNative"
                        label="Перевод"
                        fullWidth
                        value={values.wordNative}
                        onChange={handleChange('wordNative')}
                        margin="normal"
                        variant="outlined"
                    />
                </form>
            </main>
        </Dialog>
    );
}

WordPairActionsDialog.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    values: PropTypes.shape({
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WordPairActionsDialog);
