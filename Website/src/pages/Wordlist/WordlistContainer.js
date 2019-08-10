import React, { useState, useEffect, useCallback } from 'react';
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

  const [checkedValues, setCheckedValues] = useState([]);

  const handleToggle = useCallback(
    value => () => {
      setCheckedValues(checkedValues => {
        const currentIndex = checkedValues.indexOf(value);
        const newChecked = [...checkedValues];

        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }

        return newChecked;
      });
    },
    []
  );

  const handleReset = () => {
    setCheckedValues([]);
  };

  return (
    <Wordlist
      wordPairs={wordPairs}
      checkedValues={checkedValues}
      handleToggle={handleToggle}
      handleReset={handleReset}
    />
  );
}

export default WordlistContainer;
