import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'sticky',
    bottom: 0,
    marginTop: theme.spacing(-1),
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    transition: 'none'
  },
  closeButton: {
    marginRight: 20
  },
  title: {
    flexGrow: 1
  }
}));

function WordPairsDeleteToolbar({
  numberOfChecked,
  handleDelete,
  handleReset
}) {
  const classes = useStyles();

  return (
    <Fade in={numberOfChecked !== 0} unmountOnExit>
      <Paper square elevation={2} className={classes.paper}>
        <IconButton
          aria-label="clear selection"
          onClick={handleReset}
          color="inherit"
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Выбрано: {numberOfChecked}
        </Typography>
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
      </Paper>
    </Fade>
  );
}

WordPairsDeleteToolbar.propTypes = {
  numberOfChecked: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default WordPairsDeleteToolbar;
