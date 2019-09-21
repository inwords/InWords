import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import TrainingsNavigation from 'components/TrainingsNavigation';
import Game from './GameContainer';

function GameWrapper({ match }) {
  return (
    <Container component="div" maxWidth="lg">
      <TrainingsNavigation match={match} />
      <Game match={match} />
    </Container>
  );
}

GameWrapper.propTypes = {
  match: PropTypes.object.isRequired
};

export default GameWrapper;
