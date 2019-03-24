import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ProgressContainer from '../../containers/MainAppBar/ProgressContainer';
import PageTitleContainer from '../../containers/MainAppBar/PageTitleContainer';
import LinksListContainer from '../../containers/MainAppBar/LinksListContainer';
import ProfileMenuContainer from '../../containers/MainAppBar/ProfileMenuContainer';

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
        justifyContent: 'flex-begin',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
});

function MainAppBar({ open, handleDrawerToggle, classes, children }) {
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classes.appBar}
            >
                <ProgressContainer />
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerToggle(!open)}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <PageTitleContainer />
                    <ProfileMenuContainer />
                </Toolbar>
            </AppBar>
            <Hidden lgUp implementation="css">
                <SwipeableDrawer
                    className={classes.drawer}
                    anchor="left"
                    open={open}
                    onClose={handleDrawerToggle(false)}
                    onOpen={handleDrawerToggle(true)}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={handleDrawerToggle(false)}
                            onKeyDown={handleDrawerToggle(false)}
                        >
                            <Typography variant="h6" color="inherit" noWrap>
                                InWords
                            </Typography>
                        </div>
                    </div>
                    <Divider />
                    <LinksListContainer onClick={handleDrawerToggle(false)} />
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
                        <Typography variant="h6" color="inherit" noWrap>
                            InWords
                        </Typography>
                    </div>
                    <Divider />
                    <LinksListContainer />
                </Drawer>
            </Hidden>
            <main
                className={classes.content}
            >
                <div className={classes.drawerHeader} />
                {children}
            </main>
        </div>
    );
};

MainAppBar.propTypes = {
    avatarPath: PropTypes.string,
    open: PropTypes.bool.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    children: PropTypes.node
};

MainAppBar.defaultProps = {
    children: null
};

export default withStyles(styles)(MainAppBar);
