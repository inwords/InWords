import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import useOpeningBehaviour from '../../../hooks/useOpeningBehaviour';
import {AppBarContext} from '../../../contexts/AppBarContext';
import DrawerHeader from '../DrawerHeader';
import NavList from '../NavList';
import ProfileMenu from '../ProfileMenu';

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

function CustomAppBar({authorized, dataTransferInProgress, children = null, classes}) {
    const {appBarSettings} = React.useContext(AppBarContext);
    const [open, handleDrawerOpen, handleDrawerClose] = useOpeningBehaviour();

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} color={appBarSettings.color}>
                <Toolbar>
                    {appBarSettings.leftElements || (
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={handleDrawerOpen}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>)}
                    <Typography noWrap variant="h6" color="inherit" className={classes.grow}>
                        {appBarSettings.title}
                    </Typography>
                    {appBarSettings.rightElements || (authorized && <ProfileMenu />)}
                </Toolbar>
                {dataTransferInProgress && <LinearProgress />}
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden lgUp>
                    <SwipeableDrawer
                        open={open}
                        onClose={handleDrawerClose}
                        onOpen={handleDrawerOpen}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
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
                        classes={{
                            paper: classes.drawerPaper,
                        }}
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
};

CustomAppBar.propTypes = {
    authorized: PropTypes.bool.isRequired,
    dataTransferInProgress: PropTypes.bool.isRequired,
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomAppBar);
