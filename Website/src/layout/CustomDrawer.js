import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
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
  }
}));

function CustomDrawer() {
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
          <ul>
            <li>xxx</li>
            <li>yyy</li>
          </ul>
        </nav>
      </Drawer>
    </>
  );
}

CustomDrawer.propTypes = {};

export default CustomDrawer;
