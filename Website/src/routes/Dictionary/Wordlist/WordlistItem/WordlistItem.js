import React from 'react';
import PropTypes from 'prop-types';
import ListItemContainer from 'src/components/ListItemContainer';
import ListItem from 'src/components/ListItem';
import ListItemText from 'src/components/ListItemText';
import ListItemSecondaryAction from 'src/components/ListItemSecondaryAction';
import ListItemIcon from 'src/components/ListItemIcon';
import Checkbox from 'src/components/Checkbox';
import SpeechButton from './SpeechButton';

import './WordlistItem.css';

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
  const { serverId, onSpeech } = wordPair;

  return (
    <ListItemContainer style={style}>
      <ListItem
        component="div"
        onClick={
          !editingModeEnabled ? handleOpen(wordPair) : handleToggle(serverId)
        }
        button
        hasSecondaryAction
        className="wordlist-item"
      >
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
        <ListItemText
          id={`pair-${wordPair.serverId}`}
          primary={wordPair.wordForeign}
          secondary={wordPair.wordNative}
        />
      </ListItem>
      <ListItemSecondaryAction>
        <SpeechButton edge="end" onSpeech={onSpeech} />
      </ListItemSecondaryAction>
    </ListItemContainer>
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
