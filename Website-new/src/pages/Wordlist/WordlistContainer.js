import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import wordlistApiActions from '../../actions/wordlistApiActions';
import useCheckboxList from '../../hooks/useCheckboxList';
import WordPairDeleteAppbar from './WordPairDeleteAppbar';
import Wordlist from './Wordlist';
import WordPairAddDialog from './WordPairAddDialog';

function WordlistContainer() {
    const { isActual, wordPairs } = useSelector(store => store.wordlist);

    const dispatch = useDispatch();
    const receiveWordPairs = useCallback(
        () => dispatch(wordlistApiActions.receiveWordPairs()),
        [dispatch]
    );

    useEffect(() => {
        if (!isActual) {
            receiveWordPairs();
        }
    }, [isActual, receiveWordPairs]);

    const { checked, handleToggle, handleReset } = useCheckboxList();

    return (
        <>
            <WordPairDeleteAppbar
                checked={checked}
                handleReset={handleReset}
            />
            <Wordlist
                wordPairs={wordPairs}
                checked={checked}
                handleToggle={handleToggle}
            />
            <WordPairAddDialog visible={checked.length === 0} />
        </>
    );
}

export default WordlistContainer;
