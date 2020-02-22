import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { editWordPairs } from 'src/actions/dictionaryApiActions';
import useForm from 'src/hooks/useForm';
import WordPairEditDialog from './WordPairEditDialog';

const fakeWordPair = {
  wordForeign: '',
  wordNative: ''
};

function WordPairEditDialogContainer({
  open,
  wordPair = fakeWordPair,
  ...rest
}) {
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    {
      wordForeign: wordPair.wordForeign,
      wordNative: wordPair.wordNative
    },
    () => {
      dispatch(editWordPairs({ [wordPair.serverId]: inputs }));
    }
  );

  React.useEffect(() => {
    if (open) {
      setInputs({
        wordForeign: wordPair.wordForeign,
        wordNative: wordPair.wordNative
      });
    }
  }, [open, setInputs, wordPair]);

  return (
    <WordPairEditDialog
      open={open}
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      {...rest}
    />
  );
}

WordPairEditDialogContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  wordPair: PropTypes.shape({
    serverId: PropTypes.number.isRequired,
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired
  })
};

export default WordPairEditDialogContainer;
