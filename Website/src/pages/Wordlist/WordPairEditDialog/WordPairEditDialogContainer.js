import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  deleteWordPairAsEditPart as deleteWordPairAsEditPartAction,
  addWordPairAsEditPart as addWordPairAsEditPartAction,
} from 'actions/wordPairsApiActions';
import useForm from 'hooks/useForm';
import WordPairEditDialog from './WordPairEditDialog';

function WordPairEditDialogContainer({ wordPair, ...rest }) {
  const dispatch = useDispatch();
  const deleteWordPairAsEditPart = pairId =>
    dispatch(deleteWordPairAsEditPartAction(pairId));
  const addWordPairAsEditPart = wordPair =>
    dispatch(addWordPairAsEditPartAction(wordPair));

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
      {...rest}
    />
  );
}

WordPairEditDialogContainer.propTypes = {
  wordPair: PropTypes.shape({
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired,
  }).isRequired,
  visible: PropTypes.bool,
};

export default WordPairEditDialogContainer;
