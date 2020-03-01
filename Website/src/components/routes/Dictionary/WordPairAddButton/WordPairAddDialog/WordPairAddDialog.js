import React from 'react';
import PropTypes from 'prop-types';
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

function WordPairAddDialog({
  open,
  handleClose,
  inputs,
  handleChange,
  handleSubmit,
  translationsInfo,
  handleTranslationSelection
}) {
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
  handleClose: PropTypes.func.isRequired,
  inputs: PropTypes.exact({
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  translationsInfo: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      translation: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  handleTranslationSelection: PropTypes.func.isRequired
};

export default WordPairAddDialog;
