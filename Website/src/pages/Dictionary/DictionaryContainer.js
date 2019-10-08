import React, {
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveWordPairs } from 'actions/wordPairsApiActions';
import DictionaryWrapper from './DictionaryWrapper';
import DictionaryToolbar from './DictionaryToolbar';
import Wordlist from './Wordlist';
import WordPairAddButton from './WordPairAddButton';

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

  const [editingModeEnabled, setEditingModeEnabled] = useState(false);

  const handleReset = () => {
    setCheckedValues([]);
    setEditingModeEnabled(false);
  };

  const [pattern, setPattern] = useState('');

  const filteredWordPairs = useMemo(
    () =>
      wordPairs.filter(({ wordForeign, wordNative }) => {
        const upperCaseSearchWord = pattern.toUpperCase();

        return (
          wordForeign.toUpperCase().includes(upperCaseSearchWord) ||
          wordNative.toUpperCase().includes(upperCaseSearchWord)
        );
      }),
    [pattern, wordPairs]
  );

  return (
    <DictionaryWrapper>
      <DictionaryToolbar
        editingModeEnabled={editingModeEnabled}
        checkedValues={checkedValues}
        handleReset={handleReset}
        setPattern={setPattern}
      />
      <Wordlist
        editingModeEnabled={editingModeEnabled}
        setEditingModeEnabled={setEditingModeEnabled}
        wordPairs={!pattern ? wordPairs : filteredWordPairs}
        checkedValues={checkedValues}
        handleToggle={handleToggle}
      />
      <WordPairAddButton visible={!editingModeEnabled} />
    </DictionaryWrapper>
  );
}

export default WordlistContainer;
