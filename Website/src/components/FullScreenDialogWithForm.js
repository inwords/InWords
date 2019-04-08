import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    content: {
        padding: theme.spacing.unit * 3,
        display: 'flex',
        justifyContent: 'center',
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function FullScreenDialogWithForm({ title = '', open, handleClose, handleSubmit, children = null, classes }) {
    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    <Typography noWrap variant="h6" color="inherit" className={classes.flex}>
                        {title}
                    </Typography>
                    <Button type="submit" form="form" color="inherit">
                        Сохранить
                    </Button>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <form id="form" onSubmit={handleSubmit}>
                    {children}
                </form>
            </main>
        </Dialog>
    );
}

FullScreenDialogWithForm.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    children: PropTypes.node,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenDialogWithForm);
