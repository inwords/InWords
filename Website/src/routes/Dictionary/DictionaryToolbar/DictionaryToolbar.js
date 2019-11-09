import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Search from './Search';
import DictionaryMenuButton from './DictionaryMenuButton';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    minHeight: theme.spacing(8),
    padding: theme.spacing(0, 3)
  },
  titleBlock: {
    marginRight: 'auto'
  },
  normalTitleBlock: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  spacer: {
    flex: '1 1 100%',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  closeButton: {
    marginRight: theme.spacing(2)
  },
  deleteButton: {
    color: theme.palette.error.main
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
    <div className={classes.root}>
      {!editingModeEnabled ? (
        <>
          <div className={clsx(classes.titleBlock, classes.normalTitleBlock)}>
            <Typography component="h1" variant="h6">
              Словарь
            </Typography>
          </div>
          <Search value={inputs.pattern} onChange={handleChange} />
        </>
      ) : (
        <>
          <IconButton
            edge="start"
            aria-label="clear selection"
            onClick={handleReset}
            color="inherit"
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <div className={classes.titleBlock}>
            <Typography component="h2" variant="h6">
              Выбрано: {numberOfChecked}
            </Typography>
          </div>
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleDelete();
              handleReset();
            }}
            disabled={numberOfChecked === 0}
            className={classes.deleteButton}
          >
            <DeleteIcon />
          </IconButton>
          <DictionaryMenuButton
            disabled={numberOfChecked === 0}
            checkedValues={checkedValues}
          />
        </>
      )}
    </div>
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
