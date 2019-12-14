import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { editWordPairs } from 'src/actions/dictionaryApiActions';
import useForm from 'src/hooks/useForm';
import WordPairEditDialog from './WordPairEditDialog';

function WordPairEditDialogContainer({
  open,
  wordPair: { serverId, wordForeign, wordNative } = {
    wordForeign: '',
    wordNative: ''
  },
  ...rest
}) {
  const dispatch = useDispatch();

  const initialInputs = {
    wordForeign,
    wordNative
  };

  const { inputs, handleChange, handleSubmit } = useForm(initialInputs, () => {
    dispatch(editWordPairs({ [serverId]: inputs }));
  });

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
