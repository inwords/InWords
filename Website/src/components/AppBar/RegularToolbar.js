import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileMenu from './ProfileMenu';
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

function RegularAppBar({ authorized, handleDrawerOpen, classes }) {
    const { appBarSettings } = React.useContext(AppBarContext);

    return (
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <Typography noWrap variant="h6" color="inherit" className={classes.grow}>
                {appBarSettings.title}
            </Typography>
            {authorized && <ProfileMenu />}
        </Toolbar>
    );
};

RegularAppBar.propTypes = {
    authorized: PropTypes.bool.isRequired,
    handleDrawerOpen: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegularAppBar);
