import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import debounce from 'src/utils/debounce';
import useDialog from 'src/hooks/useDialog';
import Wordlist from './Wordlist';
import WordPairEditDialog from '../WordPairEditDialog';

const heightOffset = 153;

function WordlistContainer({ wordPairs, ...rest }) {
  const [listHeight, setListHeight] = React.useState(
    () => window.innerHeight - heightOffset
  );

  React.useEffect(() => {
    const handleResize = debounce(() => {
      setListHeight(window.innerHeight - heightOffset);
    }, 200);

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [listHeight]);

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
    <Fragment>
      <Wordlist
        wordPairs={wordPairs}
        listHeight={listHeight}
        handleOpen={handleOpen}
        {...rest}
      />
      <WordPairEditDialog
        open={open}
        handleClose={handleClose}
        wordPair={currentWordPair}
      />
    </Fragment>
  );
}

WordlistContainer.propTypes = {
  wordPairs: PropTypes.array.isRequired
};

export default WordlistContainer;
