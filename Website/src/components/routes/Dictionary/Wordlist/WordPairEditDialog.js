import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { updateWordPairs as updateWordPairsLocal } from 'src/actions/dictionaryActions';
import { updateWordPairs } from 'src/actions/dictionaryApiActions';
import useForm from 'src/components/core/useForm';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogActions from 'src/components/core/DialogActions';
import FormGroup from 'src/components/core/FormGroup';
import TextField from 'src/components/core/TextField';
import Button from 'src/components/core/Button';

const fakeWordPair = {
  wordForeign: '',
  wordNative: ''
};

function WordPairEditDialogContainer({
  open,
  handleClose,
  wordPair = fakeWordPair
}) {
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    {
      wordForeign: wordPair.wordForeign,
      wordNative: wordPair.wordNative
    },
    async () => {
      const preparedPair = {
        wordForeign: inputs.wordForeign.trim(),
        wordNative: inputs.wordNative.trim()
      };

      try {
        const data = await dispatch(
          updateWordPairs({ [wordPair.serverId]: preparedPair })
        );
        dispatch(
          updateWordPairsLocal([
            {
              ...preparedPair,
              oldServerId: wordPair.serverId,
              serverId: data[0].serverId
            }
          ])
        );
      } catch (error) {
        dispatch(
          setSnackbar({
            text: 'Не удалось изменить слова'
          })
        );
      }
    }
  );

  useEffect(() => {
    if (open) {
      setInputs({
        wordForeign: wordPair.wordForeign,
        wordNative: wordPair.wordNative
      });
    }
  }, [open, setInputs, wordPair]);

  return (
    <Dialog
      aria-labelledby="word-pair-edit-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="word-pair-edit-dialog">Редактирование слова</DialogTitle>
      <DialogContent>
        <form
          id="word-pair-edit-form"
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
              required
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
              required
              fullWidth
            />
          </FormGroup>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Отмена
        </Button>
        <Button
          type="submit"
          form="word-pair-edit-form"
          variant="text"
          color="primary"
        >
          Готово
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WordPairEditDialogContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  wordPair: PropTypes.shape({
    serverId: PropTypes.number.isRequired,
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired
  })
};

export default WordPairEditDialogContainer;
