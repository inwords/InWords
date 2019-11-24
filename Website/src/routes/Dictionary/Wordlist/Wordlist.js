import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import List from 'src/components/List';
import WordlistItem from './WordlistItem';

function Wordlist({ wordPairs, checkedValues, listHeight, ...rest }) {
  return (
    <FixedSizeList
      innerElementType={List}
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
    </FixedSizeList>
  );
}

Wordlist.propTypes = {
  wordPairs: PropTypes.array.isRequired,
  listHeight: PropTypes.number.isRequired,
  checkedValues: PropTypes.array.isRequired,
  handleOpen: PropTypes.func.isRequired
};

export default Wordlist;
