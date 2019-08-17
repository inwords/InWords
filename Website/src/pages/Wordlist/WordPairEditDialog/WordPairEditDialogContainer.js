import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { editWordPair as editWordPairAction } from 'actions/wordPairsApiActions';
import useForm from 'hooks/useForm';
import WordPairEditDialog from './WordPairEditDialog';

function WordPairEditDialogContainer({
  wordPair: { serverId, wordForeign, wordNative },
  ...rest
}) {
  const dispatch = useDispatch();

  const { inputs, handleChange, handleSubmit, handleReset } = useForm(
    {
      wordForeign: wordForeign,
      wordNative: wordNative
    },
    () => {
      dispatch(editWordPairAction(serverId, inputs));
    }
  );

  return (
    <WordPairEditDialog
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      {...rest}
    />
  );
}

WordPairEditDialogContainer.propTypes = {
  wordPair: PropTypes.shape({
    serverId: PropTypes.number.isRequired,
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired
  }).isRequired,
  visible: PropTypes.bool
};

export default WordPairEditDialogContainer;
