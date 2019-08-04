import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveWordPairs as receiveWordPairsAction } from 'actions/wordPairsApiActions';
import useCheckboxList from 'hooks/useCheckboxList';
import Wordlist from './Wordlist';

function WordlistContainer() {
  const wordPairs = useSelector(store => store.wordPairs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!wordPairs.length) {
      const receiveWordPairs = () => dispatch(receiveWordPairsAction());

      receiveWordPairs();
    }
  }, [wordPairs.length, dispatch]);

  const { checked, handleToggle, handleReset } = useCheckboxList();

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
