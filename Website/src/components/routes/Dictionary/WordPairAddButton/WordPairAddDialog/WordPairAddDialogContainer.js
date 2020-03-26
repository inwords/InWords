import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { setSnackbar } from 'src/actions/commonActions';
import { addWordPairs as addWordPairsLocal } from 'src/actions/dictionaryActions';
import {
  addWordPairs,
  receiveWordTranslations
} from 'src/actions/dictionaryApiActions';
import useForm from 'src/hooks/useForm';
import WordPairAddDialog from './WordPairAddDialog';

const initialInputs = {
  wordForeign: '',
  wordNative: ''
};

function WordPairAddDialogContainer({ open, ...rest }) {
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    initialInputs,
    async () => {
      const preparedPair = {
        wordForeign: inputs.wordForeign.trim(),
        wordNative: inputs.wordNative.trim()
      };

      try {
        const data = await dispatch(addWordPairs([preparedPair]));
        dispatch(
          addWordPairsLocal([
            {
              ...preparedPair,
              serverId: data.wordIds[0].serverId
            }
          ])
        );
      } catch (error) {
        dispatch(setSnackbar({ text: 'Не удалось добавить слово' }));
      }
    }
  );

  const [translationsInfo, setTranslationsInfo] = React.useState([]);

  React.useEffect(() => {
    if (open) {
      setInputs(initialInputs);
      setTranslationsInfo([]);
    }
  }, [open, setInputs]);

  React.useEffect(() => {
    const word = inputs.wordForeign.trim();
    if (!word.match(/^[a-z0-9 ]+$/i)) {
      return;
    }

    const translate = async word => {
      try {
        const data = await dispatch(receiveWordTranslations(word));

        const newTranslationsInfo = [];
        data.def.forEach(meaning => {
          newTranslationsInfo.push(
            ...meaning.tr.map(({ text }) => ({
              id: uuidv4(),
              translation: text
            }))
          );
        });

        setTranslationsInfo(newTranslationsInfo);
      } catch (error) {
        // die
      }
    };

    let timerId = setTimeout(() => {
      translate(word);
    }, 700);

    return () => {
      clearTimeout(timerId);
    };
  }, [inputs.wordForeign, dispatch]);

  const handleTranslationSelection = id => () => {
    const currentWordNative = inputs.wordNative.slice().trim();
    const selectedTranslation = translationsInfo.find(
      ({ id: translationId }) => translationId === id
    ).translation;

    setInputs({
      ...inputs,
      wordNative: currentWordNative
        ? `${currentWordNative}; ${selectedTranslation}`
        : selectedTranslation
    });

    setTranslationsInfo(translationsInfo =>
      translationsInfo.filter(translationInfo => translationInfo.id !== id)
    );
  };

  return (
    <WordPairAddDialog
      open={open}
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      translationsInfo={translationsInfo}
      handleTranslationSelection={handleTranslationSelection}
      {...rest}
    />
  );
}

WordPairAddDialogContainer.propTypes = {
  open: PropTypes.bool.isRequired
};

export default WordPairAddDialogContainer;
