import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../../actions/WordlistActions';
import WordPairEditDialog from '../../components/Wordlist/WordPairEditDialog';

function WordPairEditDialogContainer(props) {
    const { editWordPair, ...rest } = props;

    const handleSubmit = wordPair => event => {
        editWordPair(wordPair);
        event.preventDefault();
    };

    return (
        <WordPairEditDialog
            {...rest}
            handleSubmit={handleSubmit}
        />
    );
}

WordPairEditDialogContainer.propTypes = {
    editWordPair: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        editWordPair: wordPair => dispatch(WordlistActions.editWordPair(wordPair))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(WordPairEditDialogContainer);
