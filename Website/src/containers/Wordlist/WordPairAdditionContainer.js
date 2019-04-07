import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wordlistApiActions from '../../actions/wordlistApiActions';
import WordPairAdd from '../../components/Wordlist/WordPairAddition';

function WordPairAdditionContainer({ addWordPair }) {
    const [values, setValues] = useState({
        wordForeign: '',
        wordNative: ''
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleReset = () => {
        setValues({
            wordForeign: '',
            wordNative: ''
        });
    };

    const handleSubmit = event => {
        addWordPair({
            WordForeign: values.wordForeign,
            WordNative: values.wordNative
        });

        event.preventDefault();
    };

    return (
        <WordPairAdd
            values={values}
            handleChange={handleChange}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
        />
    );
}

WordPairAdditionContainer.propTypes = {
    addWordPair: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        addWordPair: wordPair => dispatch(wordlistApiActions.addWordPair(wordPair))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(WordPairAdditionContainer);
