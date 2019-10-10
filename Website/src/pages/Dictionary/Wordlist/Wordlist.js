import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import List from '@material-ui/core/List';
import WordPairRow from './WordPairRow';

function Wordlist({
  listHeight,
  listRef,
  handlePressButton,
  handleReleaseButton,
  wordPairs,
  editingModeEnabled,
  checkedValues,
  handleToggle
}) {
  return (
    <FixedSizeList
      height={listHeight}
      width="100%"
      outerRef={listRef}
      outerElementType={List}
      itemCount={wordPairs.length}
      itemData={{
        wordPairs,
        checkedValues,
        handleToggle,
        editingModeEnabled,
        handlePressButton,
        handleReleaseButton
      }}
      itemSize={60}
      onScroll={handleReleaseButton}
    >
      {WordPairRow}
    </FixedSizeList>
  );
}

Wordlist.propTypes = {
  listHeight: PropTypes.number.isRequired,
  handlePressButton: PropTypes.func,
  handleReleaseButton: PropTypes.func,
  listRef: PropTypes.object.isRequired,
  editingModeEnabled: PropTypes.bool.isRequired,
  wordPairs: PropTypes.array.isRequired,
  checkedValues: PropTypes.array,
  handleToggle: PropTypes.func
};

export default Wordlist;
