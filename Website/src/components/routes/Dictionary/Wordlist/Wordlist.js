import React, { Fragment, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import debounce from 'src/utils/debounce';
import useDialog from 'src/components/core/useDialog';
import InnerList from './InnerList';
import WordlistItem from './WordlistItem';
import WordPairEditDialog from './WordPairEditDialog';

const RESIZE_DELAY = 200;

function Wordlist({ wordPairs, ...rest }) {
  const listRef = useRef(null);

  const [listHeight, setListHeight] = useState(0);

  useEffect(() => {
    const listEl = listRef.current;
    const documentElement = document.documentElement;

    const resizeList = () => {
      setListHeight(
        documentElement.clientHeight - listEl.getBoundingClientRect().top
      );
    };
    resizeList();

    const onResize = debounce(resizeList, RESIZE_DELAY);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const { open, setOpen, handleClose } = useDialog();
  const [currentWordPair, setCurrentWordPair] = useState();

  const handleOpen = wordPair => () => {
    setCurrentWordPair(wordPair);
    setOpen(true);
  };

  return (
    <Fragment>
      <FixedSizeList
        innerRef={listRef}
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
