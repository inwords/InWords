import React from 'react';
import PropTypes from 'prop-types';
import WordlistItemContainer from './WordlistItemContainer';
import WordlistItemButton from './WordlistItemButton';
import WordlistItemCheckbox from './WordlistItemCheckbox';
import WordlistItemText from './WordlistItemText';
import WordlistItemSecondaryAction from './WordlistItemSecondaryAction';
import WordlistItemIcon from './WordlistItemIcon';
import SpeechButton from './SpeechButton';

function WordlistItem({
  data: {
    wordPairs,
    checkedValues,
    handleToggle,
    handleOpen,
    editingModeEnabled
  },
  index,
  style
}) {
  const wordPair = wordPairs[index];

  const { serverId, wordForeign } = wordPair;

  const listItemCheckboxIcon = React.useMemo(
    () => (
      <WordlistItemIcon>
        <WordlistItemCheckbox
          inputProps={{ 'aria-labelledby': `pair-${serverId}` }}
          tabIndex={-1}
          checked={checkedValues.includes(serverId)}
          disableRipple
          onClick={handleToggle(serverId)}
        />
      </WordlistItemIcon>
    ),
    [serverId, checkedValues, handleToggle]
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
    <WordlistItemContainer style={style}>
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
    </WordlistItemContainer>
  );
}

WordlistItem.propTypes = {
  data: PropTypes.shape({
    wordPairs: PropTypes.arrayOf(
      PropTypes.shape({
        serverId: PropTypes.number.isRequired,
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    editingModeEnabled: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleOpen: PropTypes.func.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
};

export default WordlistItem;
