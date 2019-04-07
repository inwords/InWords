import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wordlistApiActions from '../../actions/wordlistApiActions';
import WordPairEditing from '../../components/Wordlist/WordPairEditing';

function WordPairEditingContainer({ wordPair, deleteWordPairAsEditPart, addWordPairAsEditPart }) {
    const [values, setValues] = useState({
        wordForeign: '',
        wordNative: ''
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleReset = () => {
        setValues({
            wordForeign: wordPair.wordForeign,
            wordNative: wordPair.wordNative
        });
    };

    const handleSubmit = event => {
        deleteWordPairAsEditPart(wordPair.serverId);
        addWordPairAsEditPart({
            id: wordPair.serverId,
            WordForeign: values.wordForeign,
            WordNative: values.wordNative
        });

        event.preventDefault();
    };

    return (
        <WordPairEditing
            values={values}
            handleChange={handleChange}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
        />
    );
}

WordPairEditingContainer.propTypes = {
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
)(WordPairEditingContainer);
