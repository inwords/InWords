import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import SpeechButton from '../SpeechButton';

function WordlistItem({
  wordPair,
  editingModeEnabled,
  handlePressButton,
  handleReleaseButton,
  checked,
  handleToggle,
  handleOpen
}) {
  const { serverId, wordForeign, wordNative } = wordPair;
  const labelId = `checkbox-list-label-${serverId}`;

  return (
    <>
      <ListItem
        onClick={
          editingModeEnabled ? handleToggle(serverId) : handleOpen(wordPair)
        }
        onTouchStart={handlePressButton}
        onTouchEnd={handleReleaseButton}
        onMouseDown={handlePressButton}
        onMouseUp={handleReleaseButton}
        onMouseLeave={handleReleaseButton}
        button
        dense
      >
        {editingModeEnabled && (
          <ListItemIcon>
            <Checkbox
              inputProps={{ 'aria-labelledby': labelId }}
              tabIndex={-1}
              checked={checked}
              edge="start"
              disableRipple
            />
          </ListItemIcon>
        )}
        <ListItemText
          id={labelId}
          primary={wordForeign || '-'}
          secondary={wordNative || '-'}
        />
        <ListItemSecondaryAction>
          <SpeechButton text={wordForeign} edge="end" />
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
}

WordlistItem.propTypes = {
  wordPair: PropTypes.shape({
    serverId: PropTypes.number.isRequired,
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired
  }).isRequired,
  editingModeEnabled: PropTypes.bool.isRequired,
  handlePressButton: PropTypes.func.isRequired,
  handleReleaseButton: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired
};

export default React.memo(WordlistItem);
