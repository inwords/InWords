import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useDialog from 'src/hooks/useDialog';
import Wordlist from './Wordlist';
import WordPairEditDialog from '../WordPairEditDialog';

const limitOffset = 50;

function WordlistContainer({ wordPairs, ...rest }) {
  const [visibleWordPairs, setVisibleWordPairs] = React.useState([]);
  const [limit, setLimit] = React.useState(limitOffset);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= limit * 60) {
        setLimit(limit => limit + limitOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [wordPairs, limit]);

  React.useEffect(() => {
    if (visibleWordPairs.length < wordPairs.length) {
      setVisibleWordPairs(wordPairs.slice(0, limit));
    }
  }, [wordPairs, visibleWordPairs.length, limit]);

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
