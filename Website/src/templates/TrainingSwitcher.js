import React from 'react';
import PropTypes from 'prop-types';
import Game from 'src/routes/Game';

function TrainingSwitcher({ trainingId, ...rest }) {
  switch (trainingId) {
    case 0:
      return <Game {...rest} />;
    default:
      return null;
  }
}

TrainingSwitcher.propTypes = {
  trainingId: PropTypes.number.isRequired
};

export default TrainingSwitcher;
