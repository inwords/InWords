import React from 'react';
import PropTypes from 'prop-types';
import Wordlist from './Wordlist';

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

  return <Wordlist wordPairs={visibleWordPairs} {...rest} />;
}

WordlistContainer.propTypes = {
  wordPairs: PropTypes.array.isRequired
};

export default WordlistContainer;
