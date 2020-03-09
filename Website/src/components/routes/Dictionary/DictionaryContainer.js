import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { syncWordPairs } from 'src/actions/dictionaryApiActions';
import useCheckboxList from 'src/hooks/useCheckboxList';
import createSpeech from 'src/utils/createSpeech';
import Divider from 'src/components/core/Divider';
import Paper from 'src/components/core/Paper';
import DictionaryToolbar from './DictionaryToolbar';
import Wordlist from './Wordlist';
import WordPairAddButton from './WordPairAddButton';

function DictionaryContainer() {
  const { actual, wordPairs } = useSelector(store => store.dictionary);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!actual) {
      dispatch(syncWordPairs(wordPairs.map(({ serverId }) => serverId)));
    }
  }, [actual, wordPairs, dispatch]);

  const [extendedWordPairs, setExtendedWordPairs] = React.useState([]);

  React.useEffect(() => {
    setExtendedWordPairs(
      wordPairs.map(wordPair => {
        return {
          ...wordPair,
          onSpeech: createSpeech(wordPair.wordForeign)
        };
      })
    );
  }, [wordPairs]);

  const { checkedValues, setCheckedValues, handleToggle } = useCheckboxList();

  const [editingModeEnabled, setEditingModeEnabled] = React.useState(false);

  React.useEffect(() => {
    if (checkedValues.length > 0) {
      if (!editingModeEnabled) {
        setEditingModeEnabled(true);
      }
    } else if (checkedValues.length === 0) {
      if (editingModeEnabled) {
        setEditingModeEnabled(false);
      }
    }
  }, [checkedValues, editingModeEnabled]);

  const handleReset = () => {
    setCheckedValues([]);
  };

  const [pattern, setPattern] = React.useState('');

  const filteredWordPairs = React.useMemo(
    () =>
      extendedWordPairs.filter(({ wordForeign, wordNative }) => {
        const upperCaseSearchWord = pattern.toUpperCase();

        return (
          wordForeign.toUpperCase().includes(upperCaseSearchWord) ||
          wordNative.toUpperCase().includes(upperCaseSearchWord)
        );
      }),
    [pattern, extendedWordPairs]
  );

  const handleCheckAll = () => {
    setCheckedValues(filteredWordPairs.map(({ serverId }) => serverId));
  };

  return (
    <Paper>
      <DictionaryToolbar
        editingModeEnabled={editingModeEnabled}
        checkedValues={checkedValues}
        handleReset={handleReset}
        handleCheckAll={handleCheckAll}
        setPattern={setPattern}
      />
      <Divider />
      <Wordlist
        editingModeEnabled={editingModeEnabled}
        wordPairs={filteredWordPairs}
        checkedValues={checkedValues}
        handleToggle={handleToggle}
      />
      <WordPairAddButton visible={!editingModeEnabled} />
    </Paper>
  );
}

export default DictionaryContainer;
