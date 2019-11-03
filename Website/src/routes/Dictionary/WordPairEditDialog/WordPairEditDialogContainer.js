import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { editWordPair } from 'src/actions/wordPairsApiActions';
import useForm from 'src/hooks/useForm';
import WordPairEditDialog from './WordPairEditDialog';

function WordPairEditDialogContainer({
  wordPair: { serverId, wordForeign, wordNative } = {
    wordForeign: '',
    wordNative: ''
  },
  ...rest
}) {
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    {
      wordForeign,
      wordNative
    },
    () => {
      dispatch(editWordPair(serverId, inputs));
    }
  );

  const handleReset = () => {
    setInputs({
      wordForeign,
      wordNative
    });
  };

  useEffect(() => {
    setInputs({
      wordForeign,
      wordNative
    });
  }, [wordForeign, wordNative, setInputs]);

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
  }),
  visible: PropTypes.bool
};

export default WordPairEditDialogContainer;
