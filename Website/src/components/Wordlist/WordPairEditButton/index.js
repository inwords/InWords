import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wordlistApiActions from '../../../actions/wordPairsApiActions';
import WordPairEditButton from './WordPairEditButton';
import useControlledInputValues from '../../../hooks/useControlledInputValues';

function WordPairEditButtonContainer({ wordPair, deleteWordPairAsEditPart, addWordPairAsEditPart }) {
    const [values, handleChange, handleReset] = useControlledInputValues({
        wordForeign: wordPair.wordForeign,
        wordNative: wordPair.wordNative
    });

    const handleSubmit = event => {
        deleteWordPairAsEditPart(wordPair.serverId);
        addWordPairAsEditPart({
            ...values,
            id: wordPair.serverId
        });

        event.preventDefault();
    };

    return (
        <WordPairEditButton
            values={values}
            handleChange={handleChange}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
        />
    );
}

WordPairEditButtonContainer.propTypes = {
    wordPair: PropTypes.shape({
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired,
    }).isRequired,
    deleteWordPairAsEditPart: PropTypes.func.isRequired,
    addWordPairAsEditPart: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        deleteWordPairAsEditPart: pairId => dispatch(wordlistApiActions.deleteWordPairAsEditPart(pairId)),
        addWordPairAsEditPart: wordPair => dispatch(wordlistApiActions.addWordPairAsEditPart(wordPair))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(WordPairEditButtonContainer);
