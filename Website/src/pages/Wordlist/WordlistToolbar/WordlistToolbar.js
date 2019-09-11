import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { WordlistModeContext } from '../WordlistModeContext';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2)
  },
  activeToolbar: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
  },
  title: {
    flex: '0 0 auto'
  },
  spacer: {
    flex: '1 1 100%'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.07),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.12)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
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
  },
  closeButton: {
    marginRight: 20
  }
}));

function WordlistToolbar({
  numberOfChecked,
  handleDelete,
  handleReset,
  inputs,
  handleChange,
  handleSubmit
}) {
  const classes = useStyles();

  const { editingMode } = useContext(WordlistModeContext);

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.activeToolbar]: editingMode
      })}
    >
      {!editingMode ? (
        <>
          <Hidden xsDown>
            <div className={classes.title}>
              <Typography variant="h6">Словарь</Typography>
            </div>
            <div className={classes.spacer} />
          </Hidden>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Поиск…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{
                'aria-label': 'search',
                name: 'search',
                value: inputs.search,
                onChange: handleChange
              }}
            />
          </div>
        </>
      ) : (
        <>
          <IconButton
            aria-label="clear selection"
            onClick={handleReset}
            color="inherit"
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <div className={classes.title}>
            <Typography variant="h6">Выбрано: {numberOfChecked}</Typography>
          </div>
          <div className={classes.spacer} />
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleDelete();
              handleReset();
            }}
            color="inherit"
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </Toolbar>
  );
}

WordlistToolbar.propTypes = {
  numberOfChecked: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  inputs: PropTypes.exact({
    search: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default WordlistToolbar;
