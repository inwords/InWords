import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { updateWordSet } from 'src/actions/trainingActions';
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

  const wordSet = wordSetsMap[params.courseId] || [];

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

  const handleAdding = () => {
    const newWordPairs = wordSet.filter(
      ({ serverId, hasAdded }) => !hasAdded && checkedValues.includes(serverId)
    );

    dispatch(
      addWordPairs(newWordPairs, {
        onSuccess: () => {
          dispatch(updateWordSet(+params.courseId, newWordPairs));

          dispatch(
            setSnackbar({
              text: `Добавлено новых слов: ${newWordPairs.length}`
            })
          );
        }
      })
    );
  };

  return (
    <Paper>
      <WordSetToolbar
        checkedValues={checkedValues}
        selectionAvailable={selectionAvailable}
        handleCheckAll={handleCheckAll}
        handleReset={handleReset}
        handleAdding={handleAdding}
      />
      <Divider />
      <WordSet
        wordPairs={wordSet}
        checkedValues={checkedValues}
        handleToggle={handleToggle}
      />
    </Paper>
  );
}

export default WordSetContainer;
