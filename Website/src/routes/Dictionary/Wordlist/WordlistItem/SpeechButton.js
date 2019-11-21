import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
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

const SpeechButtonRoot = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  font-size: ${props => props.theme.typography.pxToRem(24)};
  border: 0;
  border-radius: 50%;
  color: ${props => props.theme.palette.action.active};
  cursor: pointer;
  outline: 0;
  background-color: transparent;
  transition: ${props =>
    props.theme.transitions.create('background-color', {
      duration: props.theme.transitions.duration.shortest
    })};

  &:hover {
    background-color: ${props => props.theme.palette.action.hover};
  }

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

export default React.memo(SpeechButton);
