import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveWordPairs } from 'actions/wordPairsApiActions';
import Wordlist from './Wordlist';

function WordlistContainer() {
  const wordPairs = useSelector(store => store.wordPairs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!wordPairs.length) {
      dispatch(receiveWordPairs());
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

  const [searchWord, setSearchWord] = useState('');

  const filteredWordPairs = useMemo(
    () =>
      wordPairs.filter(({ wordForeign, wordNative }) => {
        const upperCaseSearchWord = searchWord.toUpperCase();

        return (
          wordForeign.toUpperCase().includes(upperCaseSearchWord) ||
          wordNative.toUpperCase().includes(upperCaseSearchWord)
        );
      }),
    [searchWord, wordPairs]
  );

  return (
    <Wordlist
      wordPairs={!searchWord ? wordPairs : filteredWordPairs}
      checkedValues={checkedValues}
      handleToggle={handleToggle}
      handleReset={handleReset}
      setSearchWord={setSearchWord}
    />
  );
}

export default WordlistContainer;
