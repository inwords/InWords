import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TrainingsNavigation from 'src/components/TrainingsNavigation';

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: theme.spacing(2)
  }
}));

function TrainingWrapper({ children }) {
  const classes = useStyles();

  return (
    <Container component="div" maxWidth="lg">
      <TrainingsNavigation />
      <div className={classes.content}>{children}</div>
    </Container>
  );
}

TrainingWrapper.propTypes = {
  children: PropTypes.object.isRequired
};

export default TrainingWrapper;
