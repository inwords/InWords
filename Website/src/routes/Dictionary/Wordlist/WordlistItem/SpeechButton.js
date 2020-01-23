import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'src/components/Icon';
import IconButton from 'src/components/IconButton';

const synth = window.speechSynthesis;

function SpeechButton({ onSpeech, ...rest }) {
  return (
    Boolean(synth) && (
      <IconButton aria-label="speak" onClick={onSpeech} {...rest}>
        <Icon>volume_up</Icon>
      </IconButton>
    )
  );
}

SpeechButton.propTypes = {
  onSpeech: PropTypes.func.isRequired
};

export default React.memo(SpeechButton);
