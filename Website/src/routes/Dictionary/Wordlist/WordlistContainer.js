import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useDialog from 'src/hooks/useDialog';
import Wordlist from './Wordlist';
import WordPairEditDialog from '../WordPairEditDialog';

const limitOffset = 30;

function WordlistContainer({ wordPairs, ...rest }) {
  const [visibleWordPairs, setVisibleWordPairs] = React.useState([]);

  React.useEffect(() => {
    setVisibleWordPairs(wordPairs.slice(0, limitOffset));
  }, [wordPairs]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        visibleWordPairs.length < wordPairs.length
      ) {
        setVisibleWordPairs(prevVisibleWordPairs =>
          wordPairs.slice(0, prevVisibleWordPairs.length + limitOffset)
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [wordPairs, visibleWordPairs.length]);

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
        wordPairs={visibleWordPairs}
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
