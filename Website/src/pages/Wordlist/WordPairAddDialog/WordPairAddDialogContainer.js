import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addWordPair } from 'actions/wordPairsApiActions';
import useForm from 'hooks/useForm';
import WordPairAddDialog from './WordPairAddDialog';

/* const key =
  'dict.1.1.20190912T153649Z.db980bf4b29b2d4f.c08d4426f0c0f8d0ac2753aff4f23b9201e99f12';
const lang = 'en-ru';

const headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded'
}); */

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

  const handleReset = () => {
    setInputs({
      wordForeign: '',
      wordNative: ''
    });
  };

  const [translations, setTranslations] = useState([]);

  const translationTimeoutRef = useRef();

  /* useEffect(() => {
    const word = inputs.wordForeign.slice().trim();
    if (word === '') return;

    const translate = word => {
      const url = new URL('https://dictionary.yandex.net/api/v1/dicservice.json/lookup');
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
            console.log(response);
            return response.json();
          }
        })
        .then(data => {
          console.log(data.def);
        })
        .catch(error => {});
    };

    window.clearTimeout(translationTimeoutRef.current);
    translationTimeoutRef.current = window.setTimeout(() => {
      translate(word)
    }, 700);
  }, [inputs.wordForeign]); */

  return (
    <WordPairAddDialog
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
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
