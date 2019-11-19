import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from './ListItemText';
import ListItemIcon from './ListItemIcon';
import SpeechButton from './SpeechButton';

const WordlistItemRoot = styled(ListItem)`
  ${props => props.theme.breakpoints.down('xs')} {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`;

const ListItemCheckbox = styled(Checkbox)`
  ${props => props.theme.breakpoints.down('xs')} {
    margin-left: -12px;
  }
`;

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
      <ListItemIcon>
        <ListItemCheckbox
          inputProps={{ 'aria-labelledby': `pair-${serverId}` }}
          tabIndex={-1}
          checked={checked}
          disableRipple
          onClick={handleToggle(serverId)}
        />
      </ListItemIcon>
    ),
    [serverId, checked, handleToggle]
  );

  const listItemText = React.useMemo(
    () => (
      <ListItemText
        id={`pair-${wordPair.serverId}`}
        primary={wordPair.wordForeign || '-'}
        secondary={wordPair.wordNative || '-'}
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
    <WordlistItemRoot
      onClick={
        !editingModeEnabled ? handleOpen(wordPair) : handleToggle(serverId)
      }
      button
    >
      {listItemCheckboxIcon}
      {listItemText}
      {listItemSpeechAction}
    </WordlistItemRoot>
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
