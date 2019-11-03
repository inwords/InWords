import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
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
  activeLink: {
    fontWeight: '500',
    color: theme.palette.primary.main
  }
}));

function SideNavList({ sideRoutes }) {
  const classes = useStyles();

  return (
    <List>
      {sideRoutes.map(({ to, text }) => (
        <ListItem key={to} component="li" button className={classes.listItem}>
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
  );
}

SideNavList.propTypes = {
  sideRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  )
};

export default SideNavList;
