import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { syncWordPairs } from 'src/actions/dictionaryApiActions';
import Divider from '@material-ui/core/Divider';
import Paper from 'src/components/Paper';
import DictionaryToolbar from './DictionaryToolbar';
import Wordlist from './Wordlist';
import WordPairAddButton from './WordPairAddButton';

const synth = window.speechSynthesis;
const lang = 'en-US';

function DictionaryContainer() {
  const { actual, wordPairs } = useSelector(store => store.dictionary);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!actual) {
      dispatch(syncWordPairs(wordPairs));
    }
  }, [actual, wordPairs, dispatch]);

  const [extendedWordPairs, setExtendedWordPairs] = React.useState([]);

  React.useEffect(() => {
    setExtendedWordPairs(
      wordPairs.map(wordPair => {
        const handleSpeech = () => {
          if (synth.speaking) {
            synth.cancel();
          }

          const speech = new SpeechSynthesisUtterance(wordPair.wordForeign);
          speech.lang = lang;
          synth.speak(speech);
        };

        return {
          ...wordPair,
          handleSpeech
        };
      })
    );
  }, [wordPairs]);

  const [checkedValues, setCheckedValues] = React.useState([]);

  const handleToggle = React.useCallback(
    value => event => {
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

  return (
    <Paper>
      <DictionaryToolbar
        editingModeEnabled={editingModeEnabled}
        checkedValues={checkedValues}
        handleReset={handleReset}
        setPattern={setPattern}
      />
      <Divider />
      <Wordlist
        editingModeEnabled={editingModeEnabled}
        wordPairs={!pattern ? extendedWordPairs : filteredWordPairs}
        checkedValues={checkedValues}
        handleToggle={handleToggle}
      />
      <WordPairAddButton visible={!editingModeEnabled} />
    </Paper>
  );
}

export default DictionaryContainer;
