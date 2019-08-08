import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveWordPairs as receiveWordPairsAction } from 'actions/wordPairsApiActions';
import Wordlist from './Wordlist';

function WordlistContainer() {
  const wordPairs = useSelector(store => store.wordPairs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!wordPairs.length) {
      const receiveWordPairs = () => {
        dispatch(receiveWordPairsAction());
      };

      receiveWordPairs();
    }
  }, [wordPairs.length, dispatch]);

  const [checked, setChecked] = useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleReset = () => {
    setChecked([]);
  };

  return (
    <Wordlist
      wordPairs={wordPairs}
      checked={checked}
      handleToggle={handleToggle}
      handleReset={handleReset}
    />
  );
}

export default WordlistContainer;
