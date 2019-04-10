import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wordlistApiActions from '../../actions/wordlistApiActions';
import WordPairEditingButton from '../../components/Wordlist/WordPairEditingButton';

function WordPairEditingButtonContainer({ wordPair, deleteWordPairAsEditPart, addWordPairAsEditPart }) {
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
