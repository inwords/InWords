import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wordlistApiActions from '../../../actions/wordPairsApiActions';
import WordPairsDeletion from './WordPairsDeleteButton';

function WordPairsDeleteButtonContainer({ checked, deleteWordPairs }) {
    const handleWordPairsDeletion = () => {
        deleteWordPairs(checked);
    };

    return <WordPairsDeletion handleWordPairsDeletion={handleWordPairsDeletion} />;
}

WordPairsDeleteButtonContainer.propTypes = {
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
)(WordPairsDeleteButtonContainer);
