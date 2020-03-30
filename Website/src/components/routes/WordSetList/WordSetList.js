import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import {
  initializeWordSetPairs,
  updateWordSetPairs
} from 'src/actions/wordSetActions';
import { addWordPairs as addWordPairsLocal } from 'src/actions/dictionaryActions';
import { getWordSetList } from 'src/actions/wordSetApiActions';
import { addWordPairs } from 'src/actions/dictionaryApiActions';
import useCheckboxList from 'src/hooks/useCheckboxList';
import Paper from 'src/components/core/Paper';
import List from 'src/components/core/List';
import ListItemContainer from 'src/components/core/ListItemContainer';
import ListItem from 'src/components/core/ListItem';
import ListItemText from 'src/components/core/ListItemText';
import ListItemIcon from 'src/components/core/ListItemIcon';
import Checkbox from 'src/components/core/Checkbox';
import WordSetListToolbar from './WordSetListToolbar';

function WordSetList() {
  const setPairsMap = useSelector(store => store.wordSet.setPairsMap);

  const params = useParams();
  const wordSetId = params.wordSetId;

  const dispatch = useDispatch();

  const { checkedValues, setCheckedValues, handleToggle } = useCheckboxList();

  React.useEffect(() => {
    (async () => {
      try {
        const data = await dispatch(getWordSetList(wordSetId));
        dispatch(initializeWordSetPairs(wordSetId, data.words));
      } catch (error) {
        dispatch(setSnackbar({ text: 'Не удалось загрузить набор слов' }));
      }
    })();
  }, [dispatch, wordSetId]);

  const handleReset = () => {
    setCheckedValues([]);
  };

  const wordPairs = setPairsMap[wordSetId] || [];

  const [selectionAvailable, setSelectionAvailable] = React.useState(true);

  React.useEffect(() => {
    setSelectionAvailable(wordPairs.some(({ hasAdded }) => !hasAdded));
  }, [wordPairs]);

  const handleCheckAll = () => {
    setCheckedValues(
      wordPairs
        .filter(({ hasAdded }) => !hasAdded)
        .map(({ serverId }) => serverId)
    );
  };

  const handleAdd = async () => {
    const newWordPairs = wordPairs.filter(
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
      dispatch(updateWordSetPairs(wordSetId, newWordPairs));
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
      <WordSetListToolbar
        checkedValues={checkedValues}
        selectionAvailable={selectionAvailable}
        handleCheckAll={handleCheckAll}
        handleReset={handleReset}
        handleAdd={handleAdd}
      />
      <List>
        {wordPairs.map(({ serverId, hasAdded, wordForeign, wordNative }) => (
          <ListItemContainer key={serverId}>
            <ListItem
              component="div"
              onClick={!hasAdded ? handleToggle(serverId) : undefined}
              button={!hasAdded}
              hasSecondaryAction
              className="wordlist-item"
            >
              <ListItemIcon>
                <Checkbox
                  inputProps={{
                    'aria-labelledby': `pair-${serverId}`,
                    'data-testid': `pair-${serverId}-checkbox`
                  }}
                  tabIndex={-1}
                  checked={hasAdded || checkedValues.includes(serverId)}
                  disabled={hasAdded}
                  onChange={handleToggle(serverId)}
                  onClick={event => {
                    event.stopPropagation();
                  }}
                  edge="start"
                />
              </ListItemIcon>
              <ListItemText
                id={`pair-${serverId}`}
                primary={wordForeign}
                secondary={wordNative}
              />
            </ListItem>
          </ListItemContainer>
        ))}
      </List>
    </Paper>
  );
}

export default WordSetList;
