import React from 'react';
import PropTypes from 'prop-types';
import Wordlist from './Wordlist';

const limitOffset = 30;

function WordlistContainer({ wordPairs, setEditingModeEnabled, ...rest }) {
  const buttonPressTimerRef = React.useRef();

  const handlePressButton = React.useCallback(() => {
    buttonPressTimerRef.current = window.setTimeout(() => {
      setEditingModeEnabled(true);
    }, 500);
  }, [setEditingModeEnabled]);

  const handleReleaseButton = React.useCallback(() => {
    window.clearTimeout(buttonPressTimerRef.current);
  }, []);

  const [visibleWordPairs, setVisibleWordPairs] = React.useState([]);

  React.useEffect(() => {
    setVisibleWordPairs(wordPairs.slice(0, limitOffset));
  }, [wordPairs]);

  React.useEffect(() => {
    const handleScroll = () => {
      handleReleaseButton();

      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        visibleWordPairs.length < wordPairs.length
      ) {
        setVisibleWordPairs(prevVisibleWordPairs =>
          wordPairs.slice(0, prevVisibleWordPairs.length + limitOffset)
        );
      } else if (window.pageYOffset === 0) {
        setVisibleWordPairs(wordPairs.slice(0, limitOffset));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleReleaseButton, wordPairs, visibleWordPairs.length]);

  return (
    <Wordlist
      wordPairs={visibleWordPairs}
      handlePressButton={handlePressButton}
      handleReleaseButton={handleReleaseButton}
      {...rest}
    />
  );
}

WordlistContainer.propTypes = {
  wordPairs: PropTypes.array.isRequired,
  setEditingModeEnabled: PropTypes.func.isRequired
};

export default WordlistContainer;
