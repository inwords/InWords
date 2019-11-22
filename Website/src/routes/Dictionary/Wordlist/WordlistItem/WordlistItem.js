import React from 'react';
import PropTypes from 'prop-types';
import ListItemButton from 'src/components/ListItemButton';
import ListItemText from 'src/components/ListItemText';
import ListItemSecondaryAction from 'src/components/ListItemSecondaryAction';
import ListItemIcon from 'src/components/ListItemIcon';
import Checkbox from 'src/components/Checkbox';
import SpeechButton from './SpeechButton';

const handleCheckboxClick = event => {
  event.stopPropagation();
};

const MemorizedListItemText = React.memo(ListItemText);
const MemorizedListItemSecondaryAction = React.memo(ListItemSecondaryAction);

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
  const { serverId, handleSpeech } = wordPair;

  const listItemCheckboxIcon = React.useMemo(
    () => (
      <ListItemIcon>
        <Checkbox
          inputProps={{ 'aria-labelledby': `pair-${serverId}` }}
          tabIndex={-1}
          checked={checkedValues.includes(serverId)}
          onChange={handleToggle(serverId)}
          onClick={handleCheckboxClick}
        />
      </ListItemIcon>
    ),
    [serverId, checkedValues, handleToggle]
  );

  return (
    <li style={style}>
      <ListItemButton
        hasSecondaryAction
        onClick={
          !editingModeEnabled ? handleOpen(wordPair) : handleToggle(serverId)
        }
        role="button"
      >
        {listItemCheckboxIcon}
        <MemorizedListItemText
          id={`pair-${wordPair.serverId}`}
          primary={wordPair.wordForeign}
          secondary={wordPair.wordNative}
        />
      </ListItemButton>
      <MemorizedListItemSecondaryAction>
        <SpeechButton handleSpeech={handleSpeech} />
      </MemorizedListItemSecondaryAction>
    </li>
  );
}

WordlistItem.propTypes = {
  data: PropTypes.shape({
    wordPairs: PropTypes.arrayOf(
      PropTypes.shape({
        serverId: PropTypes.number.isRequired,
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired,
        handleSpeech: PropTypes.func.isRequired
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
