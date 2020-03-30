import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import debounce from 'src/utils/debounce';
import useDialog from 'src/hooks/useDialog';
import InnerList from './InnerList';
import WordlistItem from './WordlistItem';
import WordPairEditDialog from './WordPairEditDialog';

const heightOffset = 152;

function Wordlist({ wordPairs, ...rest }) {
  const [listHeight, setListHeight] = React.useState(
    () => window.innerHeight - heightOffset
  );

  React.useEffect(() => {
    const addEventListener = window.addEventListener;
    const removeEventListener = window.removeEventListener;

    const onResize = debounce(() => {
      setListHeight(window.innerHeight - heightOffset);
    }, 200);

    addEventListener('resize', onResize);

    return () => {
      removeEventListener('resize', onResize);
    };
  }, [listHeight]);

  const { open, setOpen, handleClose } = useDialog();
  const [currentWordPair, setCurrentWordPair] = React.useState();

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
