import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
  },
  closeButton: {
    marginRight: 20
  },
  title: {
    flex: '0 0 auto'
  },
  listTitle: {
    marginLeft: theme.spacing(1)
  },
  spacer: {
    flex: '1 1 100%'
  }
}));

function WordPairsDeleteToolbar({
  numberOfChecked,
  handleDelete,
  handleReset
}) {
  const classes = useStyles();

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numberOfChecked > 0
      })}
    >
      {numberOfChecked > 0 ? (
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
      ) : (
        <div className={clsx(classes.title, classes.listTitle)}>
          <Typography variant="h6">Словарь</Typography>
        </div>
      )}
    </Toolbar>
  );
}

WordPairsDeleteToolbar.propTypes = {
  numberOfChecked: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default WordPairsDeleteToolbar;
