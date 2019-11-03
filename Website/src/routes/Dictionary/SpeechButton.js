import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const synth = window.speechSynthesis;
const lang = 'en-US';

function SpeechButton({ text, ...rest }) {
  return (
    Boolean(synth) && (
      <IconButton
        aria-label="speak"
        onClick={() => {
          if (synth.speaking) {
            synth.cancel();
          }

          const speech = new SpeechSynthesisUtterance(text);
          speech.lang = lang;
          synth.speak(speech);
        }}
        {...rest}
      >
        <VolumeUpIcon />
      </IconButton>
    )
  );
}

SpeechButton.propTypes = {
  text: PropTypes.string.isRequired
};

export default React.memo(SpeechButton);
