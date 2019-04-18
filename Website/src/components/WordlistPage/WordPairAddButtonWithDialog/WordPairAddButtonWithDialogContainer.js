import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wordlistApiActions from '../../../actions/wordPairsApiActions';
import useDialog from '../../../hooks/useDialog';
import useForm from '../../../hooks/useForm';
import WordPairAddButtonWithDialog from './WordPairAddButtonWithDialog';

function WordPairAddButtonWithDialogContainer({ addWordPair }) {
    const { open, handleClickOpen, handleClose } = useDialog();

    const { values, handleChange, handleSubmit, handleReset } = useForm({
        wordForeign: '',
        wordNative: ''
    }, () => addWordPair(values));

    return (
        <WordPairAddButtonWithDialog
            open={open}
            handleClickOpen={() => {
                handleClickOpen();
                handleReset();
            }}
            handleClose={handleClose}
            values={values}
            handleChange={handleChange}
            handleReset={handleReset}
            handleSubmit={(event) => {
                handleSubmit(event);
                handleClose();
            }}
        />
    );
}

WordPairAddButtonWithDialogContainer.propTypes = {
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
)(WordPairAddButtonWithDialogContainer);
