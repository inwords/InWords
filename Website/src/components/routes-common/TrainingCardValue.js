import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'src/components/core/Icon';

function TrainingCardValue({ word, onSpeech, isAudio }) {
  return isAudio && onSpeech ? <Icon fontSize="large">volume_up</Icon> : word;
}

TrainingCardValue.propTypes = {
  word: PropTypes.string.isRequired,
  onSpeech: PropTypes.func,
  isAudio: PropTypes.bool.isRequired
};

export default TrainingCardValue;
