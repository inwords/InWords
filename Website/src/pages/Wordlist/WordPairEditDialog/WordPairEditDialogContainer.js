import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { editWordPair as editWordPairAction } from 'actions/wordPairsApiActions';
import useForm from 'hooks/useForm';
import WordPairEditDialog from './WordPairEditDialog';

function WordPairEditDialogContainer({ wordPair, ...rest }) {
  const dispatch = useDispatch();
  const editWordPair = (pairId, wordPair) => {
    dispatch(editWordPairAction(pairId, wordPair));
  };

  const { inputs, handleChange, handleSubmit, handleReset } = useForm(
    {
      wordForeign: wordPair.wordForeign,
      wordNative: wordPair.wordNative
    },
    () => {
      editWordPair(wordPair.serverId, inputs);
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
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired
  }).isRequired,
  visible: PropTypes.bool
};

export default WordPairEditDialogContainer;
