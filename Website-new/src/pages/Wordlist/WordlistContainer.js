import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import wordPairsApiActions from '../../actions/wordPairsApiActions';
import useCheckboxList from '../../hooks/useCheckboxList';
import WordPairsDeleteAppbar from './WordPairsDeleteAppbar';
import Wordlist from './Wordlist';
import WordPairAddDialog from './WordPairAddDialog';

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
        <>
            <WordPairsDeleteAppbar
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
