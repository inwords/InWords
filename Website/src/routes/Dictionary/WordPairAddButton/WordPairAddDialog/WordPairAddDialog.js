import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Dialog from 'src/components/Dialog';
import DialogTitle from 'src/components/DialogTitle';
import DialogContent from 'src/components/DialogContent';
import DialogActions from 'src/components/DialogActions';
import DialogAction from 'src/components/DialogAction';
import Typography from 'src/components/Typography';
import Link from 'src/components/Link';
import FormGroup from 'src/components/FormGroup';
import TextField from 'src/components/TextField';
import Button from 'src/components/Button';

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
              label={translation}
              onClick={handleTranslationSelection(id)}
              variant="outlined"
              className="word-pair-add-dialog-chip"
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <DialogAction>
          <Button onClick={handleClose}>Отмена</Button>
        </DialogAction>
        <DialogAction>
          <Button type="submit" form="word-pair-add-form" primary>
            Добавить
          </Button>
        </DialogAction>
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
