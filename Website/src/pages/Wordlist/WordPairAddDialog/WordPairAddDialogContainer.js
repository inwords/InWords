import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import wordPairsApiActions from '../../../actions/wordPairsApiActions';
import useForm from '../../../hooks/useForm';
import WordPairAddDialog from './WordPairAddDialog';

function WordPairAddDialogContainer({ ...rest }) {
    const dispatch = useDispatch();
    const addWordPair = useCallback(
        wordPair => dispatch(wordPairsApiActions.addWordPair(wordPair)),
        [dispatch]
    );

    const { inputs, handleChange, handleSubmit, handleReset } = useForm({
        wordForeign: '',
        wordNative: ''
    }, () => addWordPair(inputs));

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
