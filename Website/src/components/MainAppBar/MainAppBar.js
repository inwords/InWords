import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ProgressContainer from '../../containers/MainAppBar/ProgressContainer';
import PageTitleContainer from '../../containers/MainAppBar/PageTitleContainer';
import ProfileMenuContainer from '../../containers/MainAppBar/ProfileMenuContainer';
import LinksList from './LinksList';
import DrawerHeader from './DrawerHeader';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
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
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
});

function MainAppBar({ accessToken, classes, children }) {
    const [open, setOpen] = useState(false);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={classes.appBar}
            >
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
                    <PageTitleContainer />
                    {accessToken && <ProfileMenuContainer />}
                </Toolbar>
            </AppBar>
            <Hidden lgUp implementation="css">
                <SwipeableDrawer
                    className={classes.drawer}
                    anchor="left"
                    open={open}
                    onClose={handleDrawerClose}
                    onOpen={handleDrawerOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <DrawerHeader />
                    </div>
                    <Divider />
                    <LinksList accessToken={accessToken} onClick={handleDrawerClose} />
                </SwipeableDrawer>
            </Hidden>
            <Hidden mdDown implementation="css">
                <Drawer
                    className={classes.drawer}
                    anchor="left"
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <DrawerHeader />
                    </div>
                    <Divider />
                    <LinksList accessToken={accessToken} />
                </Drawer>
            </Hidden>
            <main className={classes.content}>
                <div className={classes.drawerHeader} />
                {children}
            </main>
        </div>
    );
};

MainAppBar.propTypes = {
    accessToken: PropTypes.string,
    classes: PropTypes.object.isRequired,
    children: PropTypes.node
};

MainAppBar.defaultProps = {
    accessToken: null,
    children: null
};

export default withStyles(styles)(MainAppBar);
