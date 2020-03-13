import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addWordPairs } from 'src/actions/dictionaryApiActions';
import uuidv4 from 'src/utils/uuidv4';
import useForm from 'src/hooks/useForm';
import WordPairAddDialog from './WordPairAddDialog';

const API_URL = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup';

const key =
  'dict.1.1.20190912T153649Z.db980bf4b29b2d4f.c08d4426f0c0f8d0ac2753aff4f23b9201e99f12';
const lang = 'en-ru';

const headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded'
});

const initialInputs = {
  wordForeign: '',
  wordNative: ''
};

function WordPairAddDialogContainer({ open, ...rest }) {
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    initialInputs,
    () => {
      dispatch(addWordPairs([inputs]));
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

    const translate = word => {
      const url = new URL(API_URL);
      const params = { key, lang, text: word };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
      );

      (async () => {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers
          });

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
        } catch (_) {
          setTranslationsInfo([]);
        }
      })();
    };

    let timerId = setTimeout(() => {
      translate(word);
    }, 700);

    return () => {
      clearTimeout(timerId);
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
