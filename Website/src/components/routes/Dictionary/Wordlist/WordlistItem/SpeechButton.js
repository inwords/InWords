import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'src/components/core/Icon';
import IconButton from 'src/components/core/IconButton';

function SpeechButton({ onSpeech, ...rest }) {
  return (
    <IconButton aria-label="speak" onClick={onSpeech} {...rest}>
      <Icon>volume_up</Icon>
    </IconButton>
  );
}

SpeechButton.propTypes = {
  onSpeech: PropTypes.func.isRequired
};

export default React.memo(SpeechButton);
