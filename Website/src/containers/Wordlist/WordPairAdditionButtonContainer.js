import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wordlistApiActions from '../../actions/wordlistApiActions';
import WordPairAdditionButton from '../../components/Wordlist/WordPairAdditionButton';
import useSimpleValues from '../../hooks/useSimpleValues';

function WordPairAdditionButtonContainer({ addWordPair }) {
    const [values, handleChange, handleReset] = useSimpleValues({
        wordForeign: '',
        wordNative: ''
    });

    const handleSubmit = event => {
        addWordPair(values);
        event.preventDefault();
    };

    return (
        <WordPairAdditionButton
            values={values}
            handleChange={handleChange}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
        />
    );
}

WordPairAdditionButtonContainer.propTypes = {
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
)(WordPairAdditionButtonContainer);
