import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wordlistApiActions from '../../actions/wordlistApiActions';
import WordPairsDeletion from '../../components/Wordlist/WordPairsDeletion';

function WordPairsDeletionContainer({ checked, deleteWordPairs }) {
    const handleWordPairsDeletion = () => {
        deleteWordPairs(checked);
    };

    return (
        <WordPairsDeletion
            available={Boolean(checked.length)}
            handleWordPairsDeletion={handleWordPairsDeletion}
        />
    );
}

WordPairsDeletionContainer.propTypes = {
    checked: PropTypes.arrayOf(
        PropTypes.number.isRequired
    ).isRequired,
    deleteWordPairs: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        deleteWordPairs: pairIds => dispatch(wordlistApiActions.deleteWordPairs(pairIds))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(WordPairsDeletionContainer);
