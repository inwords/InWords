import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import wordPairsApiActions from '../../actions/wordPairsApiActions';
import useCheckboxList from '../../hooks/useCheckboxList';
import Wordlist from './Wordlist';

function WordlistContainer() {
    const wordPairs = useSelector(store => store.wordPairs);

    const dispatch = useDispatch();
    const receiveWordPairs = useCallback(
        () => dispatch(wordPairsApiActions.receiveWordPairs()),
        [dispatch]
    );

    useEffect(() => {
        if (!wordPairs.length) {
            receiveWordPairs();
        }
    }, [wordPairs.length, receiveWordPairs]);

    const { checked, handleToggle, handleReset } = useCheckboxList();

    return (
        <Wordlist
            wordPairs={wordPairs}
            checked={checked}
            handleToggle={handleToggle}
            handleReset={handleReset}
        />
    );
}

export default WordlistContainer;
