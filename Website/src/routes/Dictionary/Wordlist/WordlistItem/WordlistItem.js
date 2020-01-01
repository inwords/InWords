import React from 'react';
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import ListItemContainer from 'src/components/ListItemContainer';
import ListItem from 'src/components/ListItem';
import ListItemText from 'src/components/ListItemText';
import ListItemSecondaryAction from 'src/components/ListItemSecondaryAction';
import ListItemIcon from 'src/components/ListItemIcon';
import Checkbox from 'src/components/Checkbox';
import SpeechButton from './SpeechButton';

const WordlistItemButton = styled(ListItem)`
  height: 56px;
  border-bottom: 1px solid ${props => fade(props.theme.palette.divider, 0.08)};
`;

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
  const { serverId, handleSpeech } = wordPair;

  return (
    <ListItemContainer style={style}>
      <WordlistItemButton
        component="div"
        onClick={
          !editingModeEnabled ? handleOpen(wordPair) : handleToggle(serverId)
        }
        button
        hasSecondaryAction
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
      </WordlistItemButton>
      <ListItemSecondaryAction>
        <SpeechButton edge="end" handleSpeech={handleSpeech} />
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
