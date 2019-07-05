import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import wordlistActions from '../../actions/wordlistApiActions';
import useCheckboxList from '../../hooks/useCheckboxList';
import Wordlist from './Wordlist';

function WordlistContainer() {
    const { isActual, wordPairs } = useSelector(store => store.wordlist);

    const dispatch = useDispatch();
    const receiveWordPairs = useCallback(
        () => dispatch(wordlistActions.receiveWordPairs()),
        [dispatch]
    );

    useEffect(() => {
        if (!isActual) {
            receiveWordPairs();
        }
    }, [isActual, receiveWordPairs]);

    const { checked, handleToggle, handleReset } = useCheckboxList();

    return (
        <Wordlist
            wordPairs={wordPairs}
            checked={checked}
            handleToggle={handleToggle}
        />
    );
}

export default WordlistContainer;
