import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeWordSet } from 'src/actions/trainingActions';
import { receiveWordSet } from 'src/actions/trainingApiActions';
import { addWordPairs } from 'src/actions/dictionaryApiActions';
import useCheckboxList from 'src/hooks/useCheckboxList';
import Paper from 'src/components/core/Paper';
import Divider from 'src/components/core/Divider';
import WordSetToolbar from './WordSetToolbar';
import WordSet from './WordSet';

function WordSetContainer() {
  const wordSetsMap = useSelector(store => store.training.wordSetsMap);

  const params = useParams();

  const dispatch = useDispatch();

  const { checkedValues, setCheckedValues, handleToggle } = useCheckboxList();

  React.useEffect(() => {
    dispatch(receiveWordSet(params.courseId));
  }, [dispatch, params.courseId]);

  const handleReset = () => {
    setCheckedValues([]);
  };

  const handleCheckAll = () => {
    setCheckedValues(
      (wordSetsMap[params.courseId] || [])
        .filter(({ hasAdded }) => !hasAdded)
        .map(({ serverId }) => serverId)
    );
  };

  const handleAdding = () => {
    const wordPairs = wordSetsMap[params.courseId] || [];
    const newWordPairs = wordPairs.filter(
      ({ serverId, hasAdded }) => !hasAdded && checkedValues.includes(serverId)
    );

    dispatch(
      addWordPairs(newWordPairs, {
        onSuccess: () => {
          dispatch(
            setSnackbar({
              text: `Добавлено новых слов: ${newWordPairs.length}`
            })
          );

          dispatch(
            initializeWordSet(
              +params.courseId,
              wordPairs.map(wordPair => {
                if (
                  newWordPairs.find(
                    ({ serverId }) => serverId === wordPair.serverId
                  )
                ) {
                  return {
                    ...wordPair,
                    hasAdded: true
                  };
                }

                return wordPair;
              })
            )
          );
        }
      })
    );
  };

  return (
    <Paper>
      <WordSetToolbar
        checkedValues={checkedValues}
        handleCheckAll={handleCheckAll}
        handleReset={handleReset}
        handleAdding={handleAdding}
      />
      <Divider />
      <WordSet
        wordPairs={wordSetsMap[params.courseId] || []}
        checkedValues={checkedValues}
        handleToggle={handleToggle}
      />
    </Paper>
  );
}

export default WordSetContainer;
