import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { AppBarContext } from '../../contexts/AppBarContext';

export const drawerWidth = 240;

const styles = theme => ({
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    grow: {
        flexGrow: 1,
    },
});

function WordPairDeletionToolbar({ classes }) {
    const { appBarSettings } = React.useContext(AppBarContext);

    return (
        <Toolbar>
            <IconButton color="inherit" aria-label="Close">
                <CloseIcon />
            </IconButton>
            <Typography noWrap variant="h6" color="inherit" className={classes.grow}>
                {appBarSettings.title}
            </Typography>
            <IconButton color="inherit" aria-label="Close">
                <DeleteIcon />
            </IconButton>
        </Toolbar>
    );
};

WordPairDeletionToolbar.propTypes = {
    authorized: PropTypes.bool.isRequired,
    handleDrawerOpen: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WordPairDeletionToolbar);
