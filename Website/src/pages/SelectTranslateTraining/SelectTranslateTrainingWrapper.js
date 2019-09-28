import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import TrainingsNavigation from 'components/TrainingsNavigation';
import SelectTranslateTraining from './SelectTranslateTrainingContainer';

function SelectTranslateTrainingWrapper({ match }) {
  return (
    <Container component="div" maxWidth="lg">
      <TrainingsNavigation match={match} />
      <SelectTranslateTraining match={match} />
    </Container>
  );
}

SelectTranslateTrainingWrapper.propTypes = {
  match: PropTypes.object.isRequired
};

export default SelectTranslateTrainingWrapper;
