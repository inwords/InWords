import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  item: {
    padding: theme.spacing(0.5, 3),
  },
  selected: {
    fontWeight: '500',
  },
}));

function NavListItem({ to, text, selected }) {
  const classes = useStyles();

  return (
    <ListItem button dense component={Link} to={to} className={classes.item}>
      <ListItemText
        primary={
          <Typography
            variant="body2"
            color={selected ? 'primary' : 'initial'}
            className={selected ? classes.selected : ''}
            fontWeight={600}
          >
            {text}
          </Typography>
        }
      />
    </ListItem>
  );
}

NavListItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default memo(NavListItem);
