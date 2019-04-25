import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar/index';
import Typography from '@material-ui/core/Typography/index';
import AppBar from '@material-ui/core/AppBar/index';
import LinearProgress from '@material-ui/core/LinearProgress/index';
import Hidden from '@material-ui/core/Hidden/index';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer/index';
import Drawer from '@material-ui/core/Drawer/index';
import Divider from '@material-ui/core/Divider/index';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton/index';
import { AppBarContext } from './AppBarContext';
import useDrawer from '../../hooks/useDrawer';
import ProfileMenu from './ProfileMenu';
import DrawerHeader from './DrawerHeader';
import NavList from './NavList';

export const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
        }),
    },
    leftElementContainer: {
        marginRight: 20,
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    grow: {
        flexGrow: 1,
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

function TopAppBar({ authorized, loading, children, classes }) {
    const { appBarSettings } = React.useContext(AppBarContext);

    const { open, handleDrawerOpen, handleDrawerClose } = useDrawer();

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} color={appBarSettings.color}>
                <Toolbar>
                    {appBarSettings.leftElement ?
                        <div className={classes.leftElementContainer}>
                            {appBarSettings.leftElement}
                        </div> : (
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={handleDrawerOpen}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>)}
                    <Typography
                        noWrap
                        variant="h6"
                        color="inherit"
                        className={classes.grow}
                    >
                        {appBarSettings.title}
                    </Typography>
                    {appBarSettings.rightElements.map((element, index) =>
                        element ?
                            <React.Fragment key={index}>{element}</React.Fragment> :
                            <ProfileMenu key={index} />)}
                </Toolbar>
                {loading && <LinearProgress />}
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden lgUp>
                    <SwipeableDrawer
                        open={open}
                        onClose={handleDrawerClose}
                        onOpen={handleDrawerOpen}
                        classes={{ paper: classes.drawerPaper }}
                    >
                        <DrawerHeader />
                        <Divider />
                        <NavList authorized={authorized} onClick={handleDrawerClose} />
                    </SwipeableDrawer>
                </Hidden>
                <Hidden mdDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{ paper: classes.drawerPaper }}
                    >
                        <DrawerHeader />
                        <Divider />
                        <NavList authorized={authorized} />
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {children}
            </main>
        </div>
    );
}

TopAppBar.propTypes = {
    authorized: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopAppBar);
