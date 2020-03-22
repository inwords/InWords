import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { setSnackbar } from 'src/actions/commonActions';
import { addWordPairs as addWordPairsLocal } from 'src/actions/dictionaryActions';
import { addWordPairs } from 'src/actions/dictionaryApiActions';
import useForm from 'src/hooks/useForm';
import WordPairAddDialog from './WordPairAddDialog';

const API_URL = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup';

const key =
  'dict.1.1.20190912T153649Z.db980bf4b29b2d4f.c08d4426f0c0f8d0ac2753aff4f23b9201e99f12';

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

  React.useEffect(() => {
    if (open) {
      setInputs(initialInputs);
    }
  }, [open, setInputs]);

  const [translationsInfo, setTranslationsInfo] = React.useState([]);

  React.useEffect(() => {
    const word = inputs.wordForeign.trim();
    if (!word.match(/^[a-z0-9 ]+$/i)) {
      setTranslationsInfo([]);
      return;
    }

    let isCancelled = false;

    const translate = word => {
      const url = new URL(API_URL);
      const params = { key, lang: 'en-ru', text: word };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
      );

      (async () => {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          });

          if (isCancelled) return;

          let responseData = null;

          if (response.ok) {
            responseData = await response.json();
          }

          const newTranslationsInfo = [];
          responseData.def.forEach(meaning => {
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
      })();
    };

    let timerId = setTimeout(() => {
      translate(word);
    }, 700);

    return () => {
      clearTimeout(timerId);
      isCancelled = true;
    };
  }, [inputs.wordForeign]);

  const handleTranslationSelection = id => () => {
    const currentWordNative = inputs.wordNative.slice().trim();
    const selectedTranslation = translationsInfo.find(
      ({ id: translationId }) => translationId === id
    ).translation;

    if (!currentWordNative.includes(selectedTranslation)) {
      setInputs({
        ...inputs,
        wordNative: currentWordNative
          ? `${currentWordNative}; ${selectedTranslation}`
          : selectedTranslation
      });
    }
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
