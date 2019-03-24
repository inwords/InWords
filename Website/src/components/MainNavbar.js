import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
    hide: {
        display: 'none',
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

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function MainNavbar({ accessToken = null, avatarPath = null, isFetching, handleLogout, open, mobileOpen, handleDrawerToggle, handleDrawerToggleMobile, classes, children }) {
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classes.appBar}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerToggleMobile(!open)}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>

                    </Typography>
                    <div className="text-right">
                        {accessToken &&
                            <button type="button" className="btn btn-outline-secondary" onClick={handleLogout}>Выйти</button>}
                    </div>
                </Toolbar>
            </AppBar>
            <Hidden lgUp implementation="css">
                <SwipeableDrawer
                    className={classes.drawer}
                    anchor="left"
                    open={mobileOpen}
                    onClose={handleDrawerToggleMobile(false)}
                    onOpen={handleDrawerToggleMobile(true)}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={handleDrawerToggleMobile(false)}
                            onKeyDown={handleDrawerToggleMobile(false)}
                        >
                            <Typography variant="h6" color="inherit" noWrap>
                                InWords
                            </Typography>
                        </div>
                    </div>
                    <Divider />
                    <List onClick={handleDrawerToggleMobile(false)}>
                        {!accessToken ?
                            <Fragment>
                                <ListItemLink href="#login">
                                    <ListItemText primary="Вход" />
                                </ListItemLink>
                                <ListItemLink href="#register">
                                    <ListItemText primary="Регистрация" />
                                </ListItemLink>
                            </Fragment> :
                            <Fragment>
                                <ListItemLink href="#wordlist">
                                    <ListItemText primary="Словарь" />
                                </ListItemLink>
                                <ListItemLink href="#game">
                                    <ListItemText primary="Игра" />
                                </ListItemLink>
                                <ListItemLink href="#account">
                                    <ListItemText primary="Профиль" />
                                </ListItemLink>
                            </Fragment>
                        }
                    </List>
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
                    <List>
                        {!accessToken ?
                            <Fragment>
                                <ListItemLink href="#login">
                                    <ListItemText primary="Вход" />
                                </ListItemLink>
                                <ListItemLink href="#register">
                                    <ListItemText primary="Регистрация" />
                                </ListItemLink>
                            </Fragment> :
                            <Fragment>
                                <ListItemLink href="#wordlist">
                                    <ListItemText primary="Словарь" />
                                </ListItemLink>
                                <ListItemLink href="#game">
                                    <ListItemText primary="Игра" />
                                </ListItemLink>
                                <ListItemLink href="#account">
                                    <ListItemText primary="Профиль" />
                                </ListItemLink>
                            </Fragment>
                        }
                    </List>
                </Drawer>
            </Hidden>
            <main
                className={classes.content}
            >
                <div className={classes.drawerHeader} />
                {children}
            </main>
        </div>
        /*<nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3 sticky-top">
            {accessToken && avatarPath &&
                <a className="navbar-brand" href="#/">
                    <img className="rounded-circle" src={avatarPath} width="30" height="30" alt="&#128565;" />
                </a>}
            <a className="navbar-brand" href="#/">InWords</a>
            <div className={`spinner-border spinner-border-sm text-secondary ${isFetching ? "" : "invisible"}`} role="status" />
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Навигация">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    {!accessToken ?
                        <Fragment>
                            <li className="nav-item">
                                <a className="nav-link" href="#login">Авторизация</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#register">Регистрация</a>
                            </li>
                        </Fragment> :
                        <Fragment>
                            <li className="nav-item">
                                <a className="nav-link" href="#wordlist">Словарь</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#game">Игра</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#account">Аккаунт</a>
                            </li>
                        </Fragment>}
                </ul>
                {accessToken &&
                    <button type="button" className="btn btn-outline-secondary" onClick={handleLogout}>Выйти</button>}
            </div>
        </nav >*/
    );
};

MainNavbar.propTypes = {
    accessToken: PropTypes.string,
    avatarPath: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    mobileOpen: PropTypes.bool.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired,
    handleDrawerToggleMobile: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainNavbar);
