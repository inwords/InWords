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

const MemorizedListItemCheckboxIcon = React.memo(function ListItemCheckboxIcon({
  serverId,
  checkedValues,
  handleToggle
}) {
  return (
    <ListItemIcon>
      <Checkbox
        inputProps={{ 'aria-labelledby': `pair-${serverId}` }}
        tabIndex={-1}
        checked={checkedValues.includes(serverId)}
        onChange={handleToggle(serverId)}
        onClick={handleCheckboxClick}
        edge="start"
      />
    </ListItemIcon>
  );
});

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

  return (
    <li style={style}>
      <ListItemButton
        onClick={
          !editingModeEnabled ? handleOpen(wordPair) : handleToggle(serverId)
        }
        hasSecondaryAction
        dense
      >
        <MemorizedListItemCheckboxIcon
          serverId={serverId}
          checkedValues={checkedValues}
          handleToggle={handleToggle}
        />
        <MemorizedListItemText
          id={`pair-${wordPair.serverId}`}
          primary={wordPair.wordForeign}
          secondary={wordPair.wordNative}
        />
      </ListItemButton>
      <MemorizedListItemSecondaryAction>
        <SpeechButton edge="end" handleSpeech={handleSpeech} />
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
