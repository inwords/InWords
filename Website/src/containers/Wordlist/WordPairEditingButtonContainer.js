import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wordlistApiActions from '../../actions/wordlistApiActions';
import WordPairEditingButton from '../../components/Wordlist/WordPairEditingButton';
import useSimpleValues from '../../hooks/useSimpleValues';

function WordPairEditingButtonContainer({ wordPair, deleteWordPairAsEditPart, addWordPairAsEditPart }) {
    const [values, handleChange, handleReset] = useSimpleValues({
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
        <WordPairEditingButton
            values={values}
            handleChange={handleChange}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
        />
    );
}

WordPairEditingButtonContainer.propTypes = {
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
)(WordPairEditingButtonContainer);
