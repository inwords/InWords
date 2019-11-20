import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import WordlistItemButton from './WordlistItemButton';
import WordlistItemCheckbox from './WordlistItemCheckbox';
import WordlistItemText from './WordlistItemText';
import WordlistItemSecondaryAction from './WordlistItemSecondaryAction';
import WordlistItemIcon from './WordlistItemIcon';
import SpeechButton from './SpeechButton';

function WordlistItemContent({
  wordPair,
  checked,
  handleToggle,
  handleOpen,
  editingModeEnabled
}) {
  const { serverId, wordForeign } = wordPair;

  const listItemCheckboxIcon = React.useMemo(
    () => (
      <WordlistItemIcon>
        <WordlistItemCheckbox
          inputProps={{ 'aria-labelledby': `pair-${serverId}` }}
          tabIndex={-1}
          checked={checked}
          disableRipple
          onClick={handleToggle(serverId)}
        />
      </WordlistItemIcon>
    ),
    [serverId, checked, handleToggle]
  );

  const listItemText = React.useMemo(
    () => (
      <WordlistItemText
        id={`pair-${wordPair.serverId}`}
        primary={wordPair.wordForeign}
        secondary={wordPair.wordNative}
      />
    ),
    [wordPair]
  );

  const listItemSpeechAction = React.useMemo(
    () => (
      <WordlistItemSecondaryAction>
        <SpeechButton text={wordForeign} />
      </WordlistItemSecondaryAction>
    ),
    [wordForeign]
  );

  return (
    <Fragment>
      <WordlistItemButton
        onClick={
          !editingModeEnabled ? handleOpen(wordPair) : handleToggle(serverId)
        }
        role="button"
      >
        {listItemCheckboxIcon}
        {listItemText}
      </WordlistItemButton>
      {listItemSpeechAction}
    </Fragment>
  );
}

WordlistItemContent.propTypes = {
  wordPair: PropTypes.shape({
    serverId: PropTypes.number.isRequired,
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired
  }).isRequired,
  checked: PropTypes.bool.isRequired,
  editingModeEnabled: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired
};

export default React.memo(WordlistItemContent);
