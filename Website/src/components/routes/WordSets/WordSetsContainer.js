import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializWordSets } from 'src/actions/wordSetActions';
import { receiveWordSets } from 'src/actions/wordSetApiActions';
import WordSets from './WordSets';

function WordSetsContainer() {
  const wordSets = useSelector(store => store.wordSet.sets);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!wordSets.length) {
      (async () => {
        try {
          const data = await dispatch(receiveWordSets());
          dispatch(initializWordSets(data));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить курсы' }));
        }
      })();
    }
  }, [wordSets.length, dispatch]);

  return <WordSets wordSets={wordSets} />;
}

export default WordSetsContainer;
