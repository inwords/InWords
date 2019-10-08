import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import TrainingsNavigation from 'components/TrainingsNavigation';

function TrainingWrapper({ children, match }) {
  return (
    <Container component="div" maxWidth="lg">
      <TrainingsNavigation match={match} />
      {children}
    </Container>
  );
}

TrainingWrapper.propTypes = {
  children: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default TrainingWrapper;
