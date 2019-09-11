import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import useDialog from 'hooks/useDialog';
import { WordlistModeContext } from './WordlistModeContext';
import WordPairEditDialog from './WordPairEditDialog';

function WordPairRow({
  index,
  data: { wordPairs, checkedValues, handleToggle },
  style
}) {
  const { serverId, wordForeign, wordNative } = wordPairs[index];
  const labelId = `checkbox-list-label-${serverId}`;

  const { open, handleOpen, handleClose } = useDialog();

  const { editingMode, handleButtonPress, handleButtonRelease } = useContext(
    WordlistModeContext
  );

  return (
    <>
      <ListItem
        key={index}
        onClick={editingMode ? handleToggle(serverId) : handleOpen}
        onTouchStart={handleButtonPress}
        onTouchEnd={handleButtonRelease}
        onMouseDown={handleButtonPress}
        onMouseUp={handleButtonRelease}
        onMouseLeave={handleButtonRelease}
        ContainerProps={{ style }}
        button
        dense
      >
        {editingMode && (
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
        {window.speechSynthesis && (
          <ListItemSecondaryAction>
            <IconButton
              aria-label="speak"
              onClick={() => {
                const speech = new SpeechSynthesisUtterance(wordForeign);
                speech.lang = 'en-US';
                window.speechSynthesis.speak(speech);
              }}
              edge="end"
            >
              <VolumeUpIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <WordPairEditDialog
        open={open}
        handleClose={handleClose}
        wordPair={wordPairs[index]}
      />
    </>
  );
}

WordPairRow.propTypes = {
  data: PropTypes.exact({
    wordPairs: PropTypes.arrayOf(
      PropTypes.shape({
        serverId: PropTypes.number.isRequired,
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    handleToggle: PropTypes.func.isRequired
  }).isRequired,
  style: PropTypes.object.isRequired
};

export default WordPairRow;
