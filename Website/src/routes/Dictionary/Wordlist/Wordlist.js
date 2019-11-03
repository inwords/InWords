import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import useDialog from 'src/hooks/useDialog';
import WordlistItem from './WordlistItem';
import WordPairEditDialog from '../WordPairEditDialog';

const useStyles = makeStyles(theme => ({
  list: {
    marginBottom: theme.spacing(8)
  }
}));

function Wordlist({
  handlePressButton,
  handleReleaseButton,
  wordPairs,
  editingModeEnabled,
  checkedValues,
  handleToggle
}) {
  const styles = useStyles();
  const { open, setOpen, handleClose } = useDialog();
  const [currentWordPair, setCurrentWordPair] = React.useState();

  const handleOpen = React.useCallback(
    wordPair => () => {
      setOpen(true);
      setCurrentWordPair(wordPair);
    },
    [setOpen]
  );

  return (
    <>
      <List className={styles.list}>
        {wordPairs.map(wordPair => (
          <WordlistItem
            key={wordPair.serverId}
            wordPair={wordPair}
            editingModeEnabled={editingModeEnabled}
            handlePressButton={handlePressButton}
            handleReleaseButton={handleReleaseButton}
            checked={checkedValues.includes(wordPair.serverId)}
            handleToggle={handleToggle}
            handleOpen={handleOpen}
          />
        ))}
      </List>
      <WordPairEditDialog
        open={open}
        handleClose={handleClose}
        wordPair={currentWordPair}
      />
    </>
  );
}

Wordlist.propTypes = {
  handlePressButton: PropTypes.func,
  handleReleaseButton: PropTypes.func,
  editingModeEnabled: PropTypes.bool.isRequired,
  wordPairs: PropTypes.array.isRequired,
  checkedValues: PropTypes.array,
  handleToggle: PropTypes.func
};

export default Wordlist;
