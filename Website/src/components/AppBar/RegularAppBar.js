import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ProgressContainer from '../../containers/AppBar/ProgressContainer';
import ProfileMenuContainer from '../../containers/AppBar/ProfileMenuContainer';
import PageTitle from './PageTitle';
import DrawerHeader from './DrawerHeader';
import LinksList from './LinksList';

const drawerWidth = 240;

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
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
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

function RegularAppBar({ authorized, open, handleDrawerOpen, handleDrawerClose, children = null, classes }) {
    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <ProgressContainer />
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <PageTitle />
                    {authorized && <ProfileMenuContainer />}
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden lgUp implementation="css">
                    <SwipeableDrawer
                        anchor="left"
                        open={open}
                        onClose={handleDrawerClose}
                        onOpen={handleDrawerOpen}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <DrawerHeader />
                        <Divider />
                        <LinksList authorized={authorized} onClick={handleDrawerClose} />
                    </SwipeableDrawer>
                </Hidden>
                <Hidden mdDown implementation="css">
                    <Drawer
                        anchor="left"
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <DrawerHeader />
                        <Divider />
                        <LinksList authorized={authorized} />
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {children}
            </main>
        </div>
    );
};

RegularAppBar.propTypes = {
    authorized: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    handleDrawerOpen: PropTypes.func.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegularAppBar);
