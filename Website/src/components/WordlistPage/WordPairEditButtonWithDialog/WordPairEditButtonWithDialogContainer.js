import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wordlistApiActions from '../../../actions/wordPairsApiActions';
import useDialog from '../../../hooks/useDialog';
import useForm from '../../../hooks/useForm';
import WordPairEditButtonWithDialog from './WordPairEditButtonWithDialog';

function WordPairEditButtonWithDialogContainer({ wordPair, deleteWordPairAsEditPart, addWordPairAsEditPart }) {
    const { open, handleClickOpen, handleClose } = useDialog();

    const { values, handleChange, handleSubmit, handleReset } = useForm({
        wordForeign: wordPair.wordForeign,
        wordNative: wordPair.wordNative
    }, () => {
        deleteWordPairAsEditPart(wordPair.serverId);
        addWordPairAsEditPart({
            ...values,
            id: wordPair.serverId
        });
    });

    return (
        <WordPairEditButtonWithDialog
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

WordPairEditButtonWithDialogContainer.propTypes = {
    wordPair: PropTypes.shape({
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired
    }).isRequired,
    deleteWordPairAsEditPart: PropTypes.func.isRequired,
    addWordPairAsEditPart: PropTypes.func.isRequired
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
)(WordPairEditButtonWithDialogContainer);
