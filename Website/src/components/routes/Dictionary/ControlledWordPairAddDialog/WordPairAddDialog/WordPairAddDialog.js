import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { setSnackbar } from 'src/actions/commonActions';
import { addWordPairs as addWordPairsLocal } from 'src/actions/dictionaryActions';
import {
  addWordPairs,
  getWordTranslations
} from 'src/actions/dictionaryApiActions';
import useForm from 'src/components/core/useForm';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogActions from 'src/components/core/DialogActions';
import Typography from 'src/components/core/Typography';
import Link from 'src/components/core/Link';
import FormGroup from 'src/components/core/FormGroup';
import TextField from 'src/components/core/TextField';
import Button from 'src/components/core/Button';
import Chip from 'src/components/core/Chip';

import './WordPairAddDialog.css';

const initialInputs = {
  wordForeign: '',
  wordNative: ''
};

function WordPairAddDialog({ open, handleClose }) {
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

  const [translationsInfo, setTranslationsInfo] = useState([]);

  useEffect(() => {
    if (open) {
      setInputs(initialInputs);
      setTranslationsInfo([]);
    }
  }, [open, setInputs]);

  useEffect(() => {
    const word = inputs.wordForeign.trim();
    if (!word.match(/^[a-z0-9 ]+$/i)) {
      return;
    }

    const translate = async word => {
      try {
        const data = await dispatch(getWordTranslations(word));

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
  }, [inputs.wordForeign, dispatch, open]);

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
    <Dialog
      aria-labelledby="word-pair-add-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="word-pair-add-dialog">Добавление слова</DialogTitle>
      <DialogContent>
        <form
          id="word-pair-add-form"
          onSubmit={event => {
            handleSubmit(event);
            handleClose();
          }}
        >
          <FormGroup>
            <TextField
              id="word-foreign"
              placeholder="Слово или фраза на английском"
              name="wordForeign"
              value={inputs.wordForeign}
              onChange={handleChange}
              fullWidth
            />
          </FormGroup>
          <FormGroup>
            <TextField
              id="word-native"
              placeholder="Перевод"
              name="wordNative"
              value={inputs.wordNative}
              onChange={handleChange}
              fullWidth
            />
          </FormGroup>
        </form>
        <Typography variant="body2">
          Реализовано с помощью сервиса{' '}
          <Link href="https://tech.yandex.ru/dictionary">«Яндекс.Словарь»</Link>
        </Typography>
        <div className="word-pair-add-dialog-translations">
          {translationsInfo.map(({ id, translation }) => (
            <Chip
              key={id}
              onClick={handleTranslationSelection(id)}
              className="word-pair-add-dialog-chip"
            >
              {translation}
            </Chip>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Отмена
        </Button>
        <Button
          type="submit"
          form="word-pair-add-form"
          variant="text"
          color="primary"
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WordPairAddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default WordPairAddDialog;
