import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import WordPair from './WordPair';
import WordPairsDeleteToolbar from './WordPairsDeleteToolbar';
import WordPairAddButton from './WordPairAddButton';

const useStyles = makeStyles(theme => ({
  list: {
    marginBottom: theme.spacing(3),
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

function Wordlist({ wordPairs, checkedValues, handleToggle, handleReset }) {
  const classes = useStyles();

  return (
    <Container component="div" maxWidth="md">
      <List className={classes.list}>
        {wordPairs.map(wordPair => (
          <WordPair
            key={wordPair.serverId}
            wordPair={wordPair}
            checked={checkedValues.includes(wordPair.serverId)}
            handleToggle={handleToggle}
            editingAvailable={checkedValues.length === 0}
          />
        ))}
      </List>
      <WordPairAddButton visible={checkedValues.length === 0} />
      <WordPairsDeleteToolbar
        checkedValues={checkedValues}
        handleReset={handleReset}
      />
    </Container>
  );
}

Wordlist.propTypes = {
  wordPairs: PropTypes.arrayOf(
    PropTypes.shape({
      serverId: PropTypes.number.isRequired,
      wordForeign: PropTypes.string.isRequired,
      wordNative: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  checkedValues: PropTypes.array.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default Wordlist;
