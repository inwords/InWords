import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  deleteWordPairAsEditPart as deleteWordPairAsEditPartAction,
  addWordPairAsEditPart as addWordPairAsEditPartAction,
} from '../../../actions/wordPairsApiActions';
import useForm from '../../../hooks/useForm';
import WordPairEditDialog from './WordPairEditDialog';

function WordPairEditDialogContainer({ wordPair }) {
  const dispatch = useDispatch();
  const deleteWordPairAsEditPart = useCallback(
    pairId => dispatch(deleteWordPairAsEditPartAction(pairId)),
    [dispatch]
  );
  const addWordPairAsEditPart = useCallback(
    wordPair => dispatch(addWordPairAsEditPartAction(wordPair)),
    [dispatch]
  );

  const { inputs, handleChange, handleSubmit, handleReset } = useForm(
    {
      wordForeign: wordPair.wordForeign,
      wordNative: wordPair.wordNative,
    },
    () => {
      deleteWordPairAsEditPart(wordPair.serverId);
      addWordPairAsEditPart({
        id: wordPair.serverId,
        ...inputs,
      });
    }
  );

  return (
    <WordPairEditDialog
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
    />
  );
}

WordPairEditDialogContainer.propTypes = {
  wordPair: PropTypes.shape({
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired,
  }).isRequired,
};

export default WordPairEditDialogContainer;
