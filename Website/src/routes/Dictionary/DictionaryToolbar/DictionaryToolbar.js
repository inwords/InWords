import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Search from './Search';
import DictionaryMenu from './DictionaryMenu';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2)
  },
  active: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  title: {
    flex: '0 0 auto'
  },
  spacer: {
    flex: '1 1 100%'
  },
  closeButton: {
    marginRight: 20
  }
}));

function DictionaryToolbar({
  editingModeEnabled,
  checkedValues,
  handleDelete,
  handleReset,
  inputs,
  handleChange
}) {
  const classes = useStyles();

  const numberOfChecked = checkedValues.length;

  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.active]: editingModeEnabled
        })}
      >
        {!editingModeEnabled ? (
          <>
            <Hidden xsDown>
              <div className={classes.title}>
                <Typography component="h1" variant="h6">
                  Словарь
                </Typography>
              </div>
              <div className={classes.spacer} />
            </Hidden>
            <Search value={inputs.pattern} onChange={handleChange} />
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
              <Typography component="h2" variant="h6">
                Выбрано: {numberOfChecked}
              </Typography>
            </div>
            <div className={classes.spacer} />
            <IconButton
              aria-label="delete"
              onClick={() => {
                handleDelete();
                handleReset();
              }}
              color="secondary"
              disabled={numberOfChecked === 0}
            >
              <DeleteIcon />
            </IconButton>
            <DictionaryMenu
              disabled={numberOfChecked === 0}
              checkedValues={checkedValues}
            />
          </>
        )}
      </Toolbar>
      <Divider />
    </>
  );
}

DictionaryToolbar.propTypes = {
  editingModeEnabled: PropTypes.bool.isRequired,
  checkedValues: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  inputs: PropTypes.exact({
    pattern: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default DictionaryToolbar;
