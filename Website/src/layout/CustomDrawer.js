import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    height: theme.spacing(8)
  },
  listItem: {
    padding: 0
  },
  link: {
    margin: 0,
    padding: '10px 24px',
    width: '100%',
    fontWeight: '400',
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  linkActive: {
    fontWeight: '500',
    color: theme.palette.primary.main
  }
}));

function CustomDrawer({ sideRoutes }) {
  const classes = useStyles();

  return (
    <>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader} />
        <Divider />
        <nav>
          <List>
            {sideRoutes.map(({ to, text }) => (
              <ListItem
                key={to}
                component="li"
                button
                className={classes.listItem}
              >
                <NavLink
                  to={to}
                  className={classes.link}
                  activeClassName={classes.activeLink}
                >
                  {text}
                </NavLink>
              </ListItem>
            ))}
          </List>
        </nav>
      </Drawer>
    </>
  );
}

CustomDrawer.propTypes = {
  sideRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  )
};

export default CustomDrawer;
