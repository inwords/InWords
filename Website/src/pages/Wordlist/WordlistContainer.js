import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveWordPairs } from 'actions/wordPairsApiActions';
import Wordlist from './Wordlist';

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

  const buttonPressTimerRef = useRef();

  const handlePressButton = () => {
    buttonPressTimerRef.current = window.setTimeout(() => {
      setEditingModeEnabled(true);
    }, 500);
  };

  const handleReleaseButton = () => {
    window.clearTimeout(buttonPressTimerRef.current);
  };

  return (
    <Wordlist
      wordPairs={!pattern ? wordPairs : filteredWordPairs}
      editingModeEnabled={editingModeEnabled}
      handlePressButton={handlePressButton}
      handleReleaseButton={handleReleaseButton}
      checkedValues={checkedValues}
      handleToggle={handleToggle}
      handleReset={handleReset}
      setPattern={setPattern}
    />
  );
}

export default WordlistContainer;
