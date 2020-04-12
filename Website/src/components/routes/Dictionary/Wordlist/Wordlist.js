import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import debounce from 'src/utils/debounce';
import useDialog from 'src/components/core/useDialog';
import InnerList from './InnerList';
import WordlistItem from './WordlistItem';
import WordPairEditDialog from './WordPairEditDialog';

const heightOffset = 152;

function Wordlist({ wordPairs, ...rest }) {
  const [listHeight, setListHeight] = useState(
    () => window.innerHeight - heightOffset
  );

  useEffect(() => {
    const onResize = debounce(() => {
      setListHeight(window.innerHeight - heightOffset);
    }, 200);

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [listHeight]);

  const { open, setOpen, handleClose } = useDialog();
  const [currentWordPair, setCurrentWordPair] = useState();

  const handleOpen = wordPair => () => {
    setCurrentWordPair(wordPair);
    setOpen(true);
  };

  return (
    <Fragment>
      <FixedSizeList
        innerElementType={InnerList}
        height={listHeight}
        itemCount={wordPairs.length}
        itemSize={56}
        itemData={{
          wordPairs,
          handleOpen,
          ...rest
        }}
      >
        {WordlistItem}
      </FixedSizeList>
      <WordPairEditDialog
        open={open}
        handleClose={handleClose}
        wordPair={currentWordPair}
      />
    </Fragment>
  );
}

Wordlist.propTypes = {
  wordPairs: PropTypes.array.isRequired,
  checkedValues: PropTypes.array,
  editingModeEnabled: PropTypes.bool,
  handleToggle: PropTypes.func
};

export default Wordlist;
