import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import wordlistApiActions from '../../../actions/wordlistApiActions';
import WordPairDeleteAppbar from './WordPairDeleteAppbar';

function WordPairDeleteAppbarContainer({ checked, ...rest }) {
    const dispatch = useDispatch();
    const deleteWordPairs = useCallback(
        pairIds => dispatch(wordlistApiActions.deleteWordPairs(pairIds)),
        [dispatch]
    );

    const handleDelete = () => {
        deleteWordPairs(checked);
    };

    return (
        <WordPairDeleteAppbar
            numberOfSelected={checked.length}
            handleDelete={handleDelete}
            {...rest}
        />
    );
}

WordPairDeleteAppbarContainer.propTypes = {
    checked: PropTypes.arrayOf(
        PropTypes.number.isRequired
    ).isRequired,
    handleReset: PropTypes.func
};

export default WordPairDeleteAppbarContainer;
