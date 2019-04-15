import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wordlistApiActions from '../../../actions/wordPairsApiActions';
import WordPairAdditionButton from './WordPairAddButton';

function WordPairAddButtonContainer({ addWordPair }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [values, setValues] = React.useState({
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

    const handleOpenWithReset = () => {
        handleOpen();
        handleReset();
    };

    const handleSubmit = event => {
        addWordPair(values);
        event.preventDefault();
    };

    const handleSubmitWithClose = event => {
        handleSubmit(event);
        handleClose();
    };

    return (
        <WordPairAdditionButton
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
