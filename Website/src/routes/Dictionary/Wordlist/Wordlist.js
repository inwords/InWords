import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import WordlistRoot from './WordlistRoot';
import WordlistItem from './WordlistItem';

function Wordlist({ wordPairs, checkedValues, listHeight, ...rest }) {
  return (
    <List
      innerElementType={WordlistRoot}
      height={listHeight}
      itemCount={wordPairs.length}
      itemSize={60}
      itemData={{
        wordPairs,
        checkedValues,
        ...rest
      }}
    >
      {WordlistItem}
    </List>
  );
}

Wordlist.propTypes = {
  wordPairs: PropTypes.array.isRequired,
  listHeight: PropTypes.number.isRequired,
  checkedValues: PropTypes.array.isRequired,
  handleOpen: PropTypes.func.isRequired
};

export default Wordlist;
