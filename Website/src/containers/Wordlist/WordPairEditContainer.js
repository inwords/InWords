import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../../actions/WordlistActions';
import WordPairEdit from '../../components/Wordlist/WordPairEdit';

function WordPairEditContainer({ wordPair, editWordPair }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const [values, setValues] = useState({
        wordForeign: '',
        wordNative: ''
    });

    useEffect(() => {
        if (open) {
            setValues({
                wordForeign: wordPair.wordForeign,
                wordNative: wordPair.wordNative
            });
        }
    }, [open]);

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = event => {
        editWordPair({
            id: wordPair.serverId,
            WordForeign: values.wordForeign,
            WordNative: values.wordNative
        });

        event.preventDefault();
        handleClose();
    };

    return (
        <WordPairEdit
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

WordPairEditContainer.propTypes = {
    wordPair: PropTypes.object.isRequired,
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
)(WordPairEditContainer);
