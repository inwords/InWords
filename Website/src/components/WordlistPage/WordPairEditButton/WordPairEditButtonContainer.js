import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wordlistApiActions from '../../../actions/wordPairsApiActions';
import WordPairEditButton from './WordPairEditButton';

function WordPairEditButtonContainer({ wordPair, deleteWordPairAsEditPart, addWordPairAsEditPart }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [values, setValues] = React.useState({
        wordForeign: wordPair.wordForeign,
        wordNative: wordPair.wordNative
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

    const handleOpenWithReset = () => {
        handleOpen();
        handleReset();
    };

    const handleSubmit = event => {
        deleteWordPairAsEditPart(wordPair.serverId);
        addWordPairAsEditPart({
            ...values,
            id: wordPair.serverId
        });

        event.preventDefault();
    };

    const handleSubmitWithClose = event => {
        handleSubmit(event);
        handleClose();
    };

    return (
        <WordPairEditButton
            open={open}
            handleOpen={handleOpenWithReset}
            handleClose={handleClose}
            values={values}
            handleChange={handleChange}
            handleReset={handleReset}
            handleSubmit={handleSubmitWithClose}
        />
    );
}

WordPairEditButtonContainer.propTypes = {
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
)(WordPairEditButtonContainer);
