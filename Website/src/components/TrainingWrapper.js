import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import TrainingsNavigation from 'components/TrainingsNavigation';

function TrainingWrapper({ children }) {
  return (
    <Container component="div" maxWidth="lg">
      <TrainingsNavigation />
      {children}
    </Container>
  );
}

TrainingWrapper.propTypes = {
  children: PropTypes.object.isRequired
};

export default TrainingWrapper;
