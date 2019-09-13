import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  item: {
    padding: 0
  },
  link: {
    paddingLeft: theme.spacing(3),
    width: '100%',
    justifyContent: 'flex-start',
    textTransform: 'none',
    fontWeight: '400'
  },
  active: {
    fontWeight: '500',
    color: theme.palette.primary.main
  }
}));

const ForwardNavLink = forwardRef((props, ref) => (
  <NavLink {...props} innerRef={ref} />
));

function NavListItem({ to, text }) {
  const classes = useStyles();

  return (
    <ListItem className={classes.item}>
      <Button
        component={ForwardNavLink}
        to={to}
        activeClassName={classes.active}
        className={classes.link}
      >
        {text}
      </Button>
    </ListItem>
  );
}

NavListItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default memo(NavListItem);
