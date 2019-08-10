import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import WordPairEditButton from './WordPairEditButton';

function WordPair({ wordPair, checked, handleToggle, editingAvailable }) {
  const { serverId, wordForeign, wordNative } = wordPair;
  const labelId = `checkbox-list-label-${serverId}`;

  return (
    <ListItem onClick={handleToggle(serverId)} button dense>
      <ListItemIcon>
        <Checkbox
          inputProps={{ 'aria-labelledby': labelId }}
          tabIndex={-1}
          checked={checked}
          edge="start"
          disableRipple
        />
      </ListItemIcon>
      <ListItemText id={labelId} primary={wordForeign} secondary={wordNative} />
      <ListItemSecondaryAction>
        <WordPairEditButton wordPair={wordPair} visible={editingAvailable} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

WordPair.propTypes = {
  wordPair: PropTypes.shape({
    serverId: PropTypes.number.isRequired,
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired
  }).isRequired,
  checked: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  editingAvailable: PropTypes.bool.isRequired
};

export default memo(WordPair);
