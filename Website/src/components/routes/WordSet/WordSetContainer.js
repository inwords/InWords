import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeWordSet, updateWordSet } from 'src/actions/wordSetActions';
import { addWordPairs as addWordPairsLocal } from 'src/actions/dictionaryActions';
import { receiveWordSet } from 'src/actions/wordSetApiActions';
import { addWordPairs } from 'src/actions/dictionaryApiActions';
import useCheckboxList from 'src/hooks/useCheckboxList';
import Paper from 'src/components/core/Paper';
import WordSetToolbar from './WordSetToolbar';
import WordSet from './WordSet';

function WordSetContainer() {
  const wordPairsMap = useSelector(store => store.wordSet.wordPairsMap);

  const params = useParams();
  const wordSetId = params.wordSetId;

  const dispatch = useDispatch();

  const { checkedValues, setCheckedValues, handleToggle } = useCheckboxList();

  React.useEffect(() => {
    (async () => {
      try {
        const data = await dispatch(receiveWordSet(wordSetId));
        dispatch(initializeWordSet(wordSetId, data));
      } catch (error) {
        dispatch(setSnackbar({ text: 'Не удалось загрузить набор слов' }));
      }
    })();
  }, [dispatch, wordSetId]);

  const handleReset = () => {
    setCheckedValues([]);
  };

  const wordSet = wordPairsMap[wordSetId] || [];

  const [selectionAvailable, setSelectionAvailable] = React.useState(true);

  React.useEffect(() => {
    setSelectionAvailable(wordSet.some(({ hasAdded }) => !hasAdded));
  }, [wordSet]);

  const handleCheckAll = () => {
    setCheckedValues(
      wordSet
        .filter(({ hasAdded }) => !hasAdded)
        .map(({ serverId }) => serverId)
    );
  };

  const handleAdd = async () => {
    const newWordPairs = wordSet.filter(
      ({ serverId, hasAdded }) => !hasAdded && checkedValues.includes(serverId)
    );

    try {
      const data = await dispatch(addWordPairs(newWordPairs));
      dispatch(
        addWordPairsLocal(
          newWordPairs.map((wordPair, index) => ({
            ...wordPair,
            serverId: data.wordIds[index].serverId
          }))
        )
      );
      dispatch(updateWordSet(wordSetId, newWordPairs));
      dispatch(
        setSnackbar({
          text: `Добавлено новых слов: ${newWordPairs.length}`
        })
      );
    } catch (error) {
      dispatch(setSnackbar({ text: 'Не удалось добавить слова' }));
    }
  };

  return (
    <Paper>
      <WordSetToolbar
        checkedValues={checkedValues}
        selectionAvailable={selectionAvailable}
        handleCheckAll={handleCheckAll}
        handleReset={handleReset}
        handleAdd={handleAdd}
      />
      <WordSet
        wordPairs={wordSet}
        checkedValues={checkedValues}
        handleToggle={handleToggle}
      />
    </Paper>
  );
}

export default WordSetContainer;
