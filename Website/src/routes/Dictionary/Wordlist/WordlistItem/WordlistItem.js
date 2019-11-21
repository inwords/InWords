import React from 'react';
import PropTypes from 'prop-types';
import WordlistItemButton from './WordlistItemButton';
import WordlistItemText from './WordlistItemText';
import WordlistItemSecondaryAction from './WordlistItemSecondaryAction';
import WordlistItemIcon from './WordlistItemIcon';
import WordlistItemCheckbox from './WordlistItemCheckbox';
import SpeechButton from './SpeechButton';

const handleCheckboxClick = event => {
  event.stopPropagation();
};

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
          onChange={handleToggle(serverId)}
          onClick={handleCheckboxClick}
        />
      </WordlistItemIcon>
    ),
    [serverId, checkedValues, handleToggle]
  );

  return (
    <div style={style}>
      <WordlistItemButton
        onClick={
          !editingModeEnabled ? handleOpen(wordPair) : handleToggle(serverId)
        }
        role="button"
      >
        {listItemCheckboxIcon}
        <WordlistItemText
          id={`pair-${wordPair.serverId}`}
          primary={wordPair.wordForeign}
          secondary={wordPair.wordNative}
        />
      </WordlistItemButton>
      <WordlistItemSecondaryAction>
        <SpeechButton text={wordForeign} />
      </WordlistItemSecondaryAction>
    </div>
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
