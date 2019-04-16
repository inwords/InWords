import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wordlistApiActions from '../../../actions/wordPairsApiActions';
import WordPairAdditionButton from './WordPairAddButton';
import useControlledInputValues from '../../../hooks/useControlledInputValues';

function WordPairAddButtonContainer({ addWordPair }) {
    const [values, handleChange, handleReset] = useControlledInputValues({
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

WordPairAddButtonContainer.propTypes = {
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
)(WordPairAddButtonContainer);
