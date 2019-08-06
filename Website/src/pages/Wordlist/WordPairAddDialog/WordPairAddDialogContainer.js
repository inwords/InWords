import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addWordPair as addWordPairAction } from 'actions/wordPairsApiActions';
import useForm from 'hooks/useForm';
import WordPairAddDialog from './WordPairAddDialog';

function WordPairAddDialogContainer({ ...rest }) {
  const dispatch = useDispatch();
  const addWordPair = wordPair => dispatch(addWordPairAction(wordPair));

  const { inputs, handleChange, handleSubmit, handleReset } = useForm(
    {
      wordForeign: '',
      wordNative: ''
    },
    () => {
      addWordPair(inputs);
    }
  );

  return (
    <WordPairAddDialog
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      {...rest}
    />
  );
}

WordPairAddDialogContainer.propTypes = {
  visible: PropTypes.bool
};

export default WordPairAddDialogContainer;
