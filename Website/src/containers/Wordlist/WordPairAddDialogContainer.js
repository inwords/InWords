import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../../actions/WordlistActions';
import WordPairEditDialog from '../../components/Wordlist/WordPairEditDialog';

function WordPairAddDialogContainer(props) {
    const { addWordPair, ...rest } = props;

    const handleSubmit = wordPair => event => {
        addWordPair(wordPair);
        event.preventDefault();
    };

    return (
        <WordPairEditDialog
            {...rest}
            handleSubmit={handleSubmit}
        />
    );
}

WordPairAddDialogContainer.propTypes = {
    addWordPair: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        addWordPair: wordPair => dispatch(WordlistActions.addWordPair(wordPair))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(WordPairAddDialogContainer);
