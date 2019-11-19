import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const synth = window.speechSynthesis;

const lang = 'en-US';

const handleClick = text => () => {
  if (synth.speaking) {
    synth.cancel();
  }

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = lang;
  synth.speak(speech);
};

const SpeechButtonRoot = styled(IconButton)`
  ${props => props.theme.breakpoints.down('xs')} {
    margin-right: -12px;
  }
`;

function SpeechButton({ text, ...rest }) {
  return (
    Boolean(synth) && (
      <SpeechButtonRoot
        aria-label="speak"
        onClick={handleClick(text)}
        {...rest}
      >
        <VolumeUpIcon />
      </SpeechButtonRoot>
    )
  );
}

SpeechButton.propTypes = {
  text: PropTypes.string.isRequired
};

export default SpeechButton;
