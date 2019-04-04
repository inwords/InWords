import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wordlistApiActions from '../../actions/wordlistApiActions';
import WordPairAdd from '../../components/Wordlist/WordPairAddition';

function WordPairAdditionContainer({ addWordPair }) {
    const [open, setOpen] = useState(false);

    const [values, setValues] = useState({
        wordForeign: '',
        wordNative: ''
    });

    useEffect(() => {
        if (open) {
            setValues({
                wordForeign: '',
                wordNative: ''
            });
        }
    }, [open]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = event => {
        addWordPair({
            WordForeign: values.wordForeign,
            WordNative: values.wordNative
        });

        event.preventDefault();
        handleClose();
    };

    return (
        <WordPairAdd
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            values={values}
            handleChange={handleChange}
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
