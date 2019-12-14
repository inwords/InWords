import React from 'react';
import PropTypes from 'prop-types';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import IconButton from 'src/components/IconButton';

const synth = window.speechSynthesis;

function SpeechButton({ handleSpeech, ...rest }) {
  return (
    Boolean(synth) && (
      <IconButton aria-label="speak" onClick={handleSpeech} {...rest}>
        <VolumeUpIcon />
      </IconButton>
    )
  );
}

SpeechButton.propTypes = {
  handleSpeech: PropTypes.func.isRequired
};

export default React.memo(SpeechButton);
