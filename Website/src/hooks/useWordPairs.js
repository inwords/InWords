import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { syncWordPairs } from 'src/actions/dictionaryApiActions';

export default function useWordPairs() {
  const { actual, wordPairs } = useSelector(store => store.dictionary);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!actual) {
      dispatch(syncWordPairs(wordPairs));
    }
  }, [actual, wordPairs, dispatch]);

  return wordPairs;
}
