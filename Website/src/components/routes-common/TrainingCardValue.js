import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'src/components/core/Icon';

function TrainingCardValue({ word, onSpeech, audible }) {
  return audible && onSpeech ? <Icon fontSize="large">volume_up</Icon> : word;
}

TrainingCardValue.propTypes = {
  word: PropTypes.string.isRequired,
  onSpeech: PropTypes.func,
  audible: PropTypes.bool.isRequired
};

export default TrainingCardValue;
