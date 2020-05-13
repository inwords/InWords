import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogActions from 'src/components/core/DialogActions';
import List from 'src/components/core/List';
import ListItemContainer from 'src/components/core/ListItemContainer';
import ListItem from 'src/components/core/ListItem';
import ListItemText from 'src/components/core/ListItemText';
import ListItemSecondaryAction from 'src/components/core/ListItemSecondaryAction';
import Button from 'src/components/core/Button';
import SpeechButton from 'src/components/routes-common/SpeechButton';

function TrainingPairsDialog({ open, handleClose, wordPairs }) {
  return (
    <Dialog
      aria-labelledby="game-pairs-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="game-pairs-dialog">Слова в тренировке</DialogTitle>
      <DialogContent>
        <List>
          {wordPairs.map(({ serverId, wordForeign, wordNative, onSpeech }) => (
            <ListItemContainer key={serverId}>
              <ListItem component="div" hasSecondaryAction>
                <ListItemText primary={wordForeign} secondary={wordNative} />
              </ListItem>
              <ListItemSecondaryAction>
                <SpeechButton edge="end" onSpeech={onSpeech} />
              </ListItemSecondaryAction>
            </ListItemContainer>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="primary" onClick={handleClose}>
          Поплыли
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TrainingPairsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  wordPairs: PropTypes.arrayOf(
    PropTypes.shape({
      serverId: PropTypes.number.isRequired,
      wordForeign: PropTypes.string.isRequired,
      wordNative: PropTypes.string.isRequired,
      onSpeech: PropTypes.func.isRequired
    }).isRequired
  ).isRequired
};

export default TrainingPairsDialog;
