import React from 'react';
import PropTypes from 'prop-types';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import WordlistItemContainer from './WordlistItemContainer';
import WordlistItemButton from './WordlistItemButton';
import WordlistItemCheckbox from './WordlistItemCheckbox';
import WordlistItemText from './WordlistItemText';
import WordlistItemIcon from './WordlistItemIcon';
import SpeechButton from './SpeechButton';

function WordlistItem({
  wordPair,
  editingModeEnabled,
  checked,
  handleToggle,
  handleOpen
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
      <ListItemSecondaryAction>
        <SpeechButton text={wordForeign} />
      </ListItemSecondaryAction>
    ),
    [wordForeign]
  );

  return (
    <WordlistItemContainer>
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
  wordPair: PropTypes.shape({
    serverId: PropTypes.number.isRequired,
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired
  }).isRequired,
  editingModeEnabled: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired
};

export default React.memo(WordlistItem);
