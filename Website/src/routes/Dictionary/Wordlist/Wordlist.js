import React from 'react';
import PropTypes from 'prop-types';
import WordlistRoot from './WordlistRoot';
import WordlistItem from './WordlistItem';

function Wordlist({ wordPairs, checkedValues, handleOpen, ...rest }) {
  return (
    <WordlistRoot>
      {wordPairs.map(wordPair => (
        <WordlistItem
          key={wordPair.serverId}
          wordPair={wordPair}
          checked={checkedValues.includes(wordPair.serverId)}
          handleOpen={handleOpen}
          {...rest}
        />
      ))}
    </WordlistRoot>
  );
}

Wordlist.propTypes = {
  wordPairs: PropTypes.array.isRequired,
  checkedValues: PropTypes.array.isRequired,
  handleOpen: PropTypes.func.isRequired
};

export default Wordlist;
