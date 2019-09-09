import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addWordPair } from 'actions/wordPairsApiActions';
import useForm from 'hooks/useForm';
import WordPairAddDialog from './WordPairAddDialog';

function WordPairAddDialogContainer({ ...rest }) {
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    {
      wordForeign: '',
      wordNative: ''
    },
    () => {
      dispatch(addWordPair(inputs));
    }
  );

  const handleReset = () => {
    setInputs({
      wordForeign: '',
      wordNative: ''
    });
  };

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
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

export default WordPairAddDialogContainer;
