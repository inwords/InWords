import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Dialog from 'src/components/Dialog';
import DialogTitle from 'src/components/DialogTitle';
import DialogContent from 'src/components/DialogContent';
import DialogActions from 'src/components/DialogActions';
import Typography from 'src/components/Typography';
import Link from 'src/components/Link';

const useStyles = makeStyles(theme => ({
  translations: {
    marginTop: 12
  },
  chip: {
    margin: 4
  }
}));

function WordPairAddDialog({
  open,
  handleClose,
  inputs,
  handleChange,
  handleSubmit,
  translationsInfo,
  handleTranslationSelection
}) {
  const classes = useStyles();
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
          <TextField
            id="word-foreign"
            label="Слово или фраза на английском"
            name="wordForeign"
            value={inputs.wordForeign}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            id="word-native"
            label="Перевод"
            name="wordNative"
            value={inputs.wordNative}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
        </form>
        <Typography variant="body2">
          Реализовано с помощью сервиса{' '}
          <Link href="https://tech.yandex.ru/dictionary">«Яндекс.Словарь»</Link>
        </Typography>
        <div className={classes.translations}>
          {translationsInfo.map(({ id, translation }) => (
            <Chip
              key={id}
              label={translation}
              onClick={handleTranslationSelection(id)}
              variant="outlined"
              className={classes.chip}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button type="submit" form="word-pair-add-form" color="primary">
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
