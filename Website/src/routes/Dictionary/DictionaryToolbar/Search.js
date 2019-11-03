import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.07),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.11)
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    width: '100%',
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
}));

function Search({ value, onChange }) {
  const classes = useStyles();
  const [focused, setFocused] = useState(false);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={!focused ? 'Поиск' : 'Введите слово'}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{
          'aria-label': 'search',
          name: 'pattern',
          value,
          onChange,
          onFocus: () => {
            setFocused(true);
          },
          onBlur: () => {
            setFocused(false);
          }
        }}
      />
    </div>
  );
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Search;
