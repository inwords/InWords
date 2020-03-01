import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import debounce from 'src/utils/debounce';
import useDialog from 'src/hooks/useDialog';
import Wordlist from './Wordlist';
import WordPairEditDialog from './WordPairEditDialog';

const heightOffset = 153;

function WordlistContainer({ wordPairs, ...rest }) {
  const [listHeight, setListHeight] = React.useState(
    () => window.innerHeight - heightOffset
  );

  React.useEffect(() => {
    const handleResize = debounce(() => {
      setListHeight(window.innerHeight - heightOffset);
    }, 200);

    const onOrientationChange = () => {
      const afterOrientationChange = () => {
        setListHeight(window.innerHeight - heightOffset);
        window.removeEventListener('resize', afterOrientationChange);
      };

      window.addEventListener('resize', afterOrientationChange);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', onOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', onOrientationChange);
    };
  }, [listHeight]);

  const { open, setOpen, handleClose } = useDialog();
  const [currentWordPair, setCurrentWordPair] = React.useState();

  const handleOpen = React.useCallback(
    wordPair => () => {
      setCurrentWordPair(wordPair);
      setOpen(true);
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
