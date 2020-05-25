import React, { useState, useEffect } from 'react';
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
import useCheckboxList from 'src/components/core/useCheckboxList';
import Paper from 'src/components/core/Paper';
import List from 'src/components/core/List';
import ListItemContainer from 'src/components/core/ListItemContainer';
import ListItem from 'src/components/core/ListItem';
import ListItemText from 'src/components/core/ListItemText';
import ListItemIcon from 'src/components/core/ListItemIcon';
import ButtonBase from 'src/components/core/ButtonBase';
import Checkbox from 'src/components/core/Checkbox';
import WordSetPairsToolbar from './WordSetPairsToolbar';

function WordSetPairs() {
  const pairsListsMap = useSelector(store => store.wordSet.pairsListsMap);

  const { wordSetId: paramWordSetId } = useParams();

  const dispatch = useDispatch();

  const { checkedValues, setCheckedValues, handleToggle } = useCheckboxList();

  useEffect(() => {
    (async () => {
      try {
        const data = await dispatch(getWordSetList(paramWordSetId));
        dispatch(initializeWordSetPairs(paramWordSetId, data.words));
      } catch (error) {
        dispatch(setSnackbar({ text: 'Не удалось загрузить набор слов' }));
      }
    })();
  }, [dispatch, paramWordSetId]);

  const handleReset = () => {
    setCheckedValues([]);
  };

  const wordSetPairs = pairsListsMap[paramWordSetId] || [];

  const [selectionAvailable, setSelectionAvailable] = useState(true);

  useEffect(() => {
    setSelectionAvailable(wordSetPairs.some(({ hasAdded }) => !hasAdded));
  }, [wordSetPairs]);

  const handleCheckAll = () => {
    setCheckedValues(
      wordSetPairs
        .filter(({ hasAdded }) => !hasAdded)
        .map(({ serverId }) => serverId)
    );
  };

  const handleAdd = async () => {
    const newWordPairs = wordSetPairs.filter(
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
      dispatch(updateWordSetPairs(paramWordSetId, newWordPairs));
      dispatch(
        setSnackbar({
          text: `Добавлено новых слов: ${newWordPairs.length}`
        })
      );
    } catch (error) {
      dispatch(setSnackbar({ text: 'Не удалось добавить слова' }));
    }
  };

  const handleCheckboxClick = event => {
    event.stopPropagation();
  };

  return (
    <Paper>
      <WordSetPairsToolbar
        checkedValues={checkedValues}
        selectionAvailable={selectionAvailable}
        handleCheckAll={handleCheckAll}
        handleReset={handleReset}
        handleAdd={handleAdd}
      />
      <List>
        {wordSetPairs.map(({ serverId, hasAdded, wordForeign, wordNative }) => {
          const labelId = `pair-${serverId}`;

          return (
            <ListItemContainer key={serverId}>
              <ListItem
                component={ButtonBase}
                onClick={handleToggle(serverId)}
                button
                disabled={hasAdded}
                className="wordlist-item"
              >
                <ListItemIcon>
                  <Checkbox
                    inputProps={{
                      'aria-labelledby': labelId,
                      'data-testid': `pair-${serverId}-checkbox`
                    }}
                    tabIndex={-1}
                    checked={hasAdded || checkedValues.includes(serverId)}
                    disabled={hasAdded}
                    onChange={handleToggle(serverId)}
                    onClick={handleCheckboxClick}
                    edge="start"
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={wordForeign}
                  secondary={wordNative}
                />
              </ListItem>
            </ListItemContainer>
          );
        })}
      </List>
    </Paper>
  );
}

export default WordSetPairs;
