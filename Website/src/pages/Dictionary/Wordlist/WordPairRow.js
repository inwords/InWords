import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import useDialog from 'src/hooks/useDialog';
import WordPairEditDialog from '../WordPairEditDialog';
import SpeechButton from '../SpeechButton';

function WordPairRow({
  index,
  data: {
    wordPairs,
    editingModeEnabled,
    handlePressButton,
    handleReleaseButton,
    checkedValues,
    handleToggle
  },
  style
}) {
  const wordPair = wordPairs[index];
  const { serverId, wordForeign, wordNative } = wordPair;

  const labelId = `checkbox-list-label-${serverId}`;

  const { open, handleOpen, handleClose } = useDialog();

  return (
    <>
      <ListItem
        key={index}
        onClick={editingModeEnabled ? handleToggle(serverId) : handleOpen}
        onTouchStart={handlePressButton}
        onTouchEnd={handleReleaseButton}
        onMouseDown={handlePressButton}
        onMouseUp={handleReleaseButton}
        onMouseLeave={handleReleaseButton}
        ContainerProps={{ style }}
        button
        dense
      >
        {editingModeEnabled && (
          <ListItemIcon>
            <Checkbox
              inputProps={{ 'aria-labelledby': labelId }}
              tabIndex={-1}
              checked={checkedValues.includes(serverId)}
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
      <WordPairEditDialog
        open={open}
        handleClose={handleClose}
        wordPair={wordPair}
      />
    </>
  );
}

WordPairRow.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.exact({
    wordPairs: PropTypes.arrayOf(
      PropTypes.shape({
        serverId: PropTypes.number.isRequired,
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    editingModeEnabled: PropTypes.bool.isRequired,
    handlePressButton: PropTypes.func.isRequired,
    handleReleaseButton: PropTypes.func.isRequired,
    checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    handleToggle: PropTypes.func.isRequired
  }).isRequired,
  style: PropTypes.object.isRequired
};

export default WordPairRow;
