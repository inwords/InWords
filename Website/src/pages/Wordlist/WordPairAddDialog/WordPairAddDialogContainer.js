import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addWordPair } from 'actions/wordPairsApiActions';
import useForm from 'hooks/useForm';
import WordPairAddDialog from './WordPairAddDialog';

const key =
  'dict.1.1.20190912T153649Z.db980bf4b29b2d4f.c08d4426f0c0f8d0ac2753aff4f23b9201e99f12';
const lang = 'en-ru';

const headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded'
});

function WordPairAddDialogContainer({ ...rest }) {
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    {
      wordForeign: '',
      wordNative: ''
    },
    () => {
      dispatch(addWordPair(inputs));
    }
  );

  const [translationsInfo, setTranslationsInfo] = useState([]);

  const translationTimeoutRef = useRef();

  useEffect(() => {
    const word = inputs.wordForeign.slice().trim();
    if (!word.match(/^[a-z0-9 ]+$/i)) {
      setTranslationsInfo([]);
      return;
    }

    const translate = word => {
      const url = new URL(
        'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
      );
      const params = { key, lang, text: word };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
      );

      fetch(url, {
        method: 'POST',
        headers
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          const newTranslationsInfo = [];
          data.def.forEach((meaning, index1) => {
            newTranslationsInfo.push(
              ...meaning.tr.map(({ text }, index2) => ({
                id: `${index1}-${index2}`,
                translation: text
              }))
            );
          });

          setTranslationsInfo(newTranslationsInfo);
        })
        .catch(error => {
          setTranslationsInfo([]);
        });
    };

    window.clearTimeout(translationTimeoutRef.current);
    translationTimeoutRef.current = window.setTimeout(() => {
      translate(word);
    }, 700);
  }, [inputs.wordForeign]);

  const handleTranslationAddition = id => () => {
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

  const handleReset = () => {
    setInputs({
      wordForeign: '',
      wordNative: ''
    });

    setTranslationsInfo([]);
  };

  return (
    <WordPairAddDialog
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      translationsInfo={translationsInfo}
      handleTranslationAddition={handleTranslationAddition}
      handleReset={handleReset}
      {...rest}
    />
  );
}

WordPairAddDialogContainer.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

export default WordPairAddDialogContainer;
