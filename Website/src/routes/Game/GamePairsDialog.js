import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'src/components/Dialog';
import DialogTitle from 'src/components/DialogTitle';
import DialogContent from 'src/components/DialogContent';
import DialogActions from 'src/components/DialogActions';
import List from 'src/components/List';
import ListItem from 'src/components/ListItem';
import ListItemText from 'src/components/ListItemText';
import Button from 'src/components/Button';

function GamePairsDialog({ open, handleClose, wordPairs }) {
  return (
    <Dialog
      aria-labelledby="game-pairs-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="game-pairs-dialog">Слова в тренировке</DialogTitle>
      <DialogContent>
        <List>
          {wordPairs.map(({ serverId, wordForeign, wordNative }) => (
            <ListItem key={serverId}>
              <ListItemText primary={wordForeign} secondary={wordNative} />
            </ListItem>
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

GamePairsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  wordPairs: PropTypes.arrayOf(
    PropTypes.shape({
      serverId: PropTypes.number.isRequired,
      wordForeign: PropTypes.string.isRequired,
      wordNative: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default GamePairsDialog;
