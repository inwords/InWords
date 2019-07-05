import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import wordlistActions from '../../../actions/wordlistApiActions';
import useForm from '../../../hooks/useForm';
import WordPairAddDialog from './WordPairAddDialog';

function WordPairAddDialogContainer({ ...rest }) {
    const dispatch = useDispatch();
    const addWordPair = useCallback(
        wordPair => dispatch(wordlistActions.addWordPairs([wordPair])),
        [dispatch]
    );

    const { values, handleChange, handleSubmit, handleReset } = useForm({
        wordForeign: '',
        wordNative: ''
    }, () => addWordPair(values));

    return (
        <WordPairAddDialog
            {...rest}
        />
    );
}

export default WordPairAddDialogContainer;
