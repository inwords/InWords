import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import WordPairEditDialogContainer from '../../containers/Wordlist/WordPairEditDialogContainer';

function WordPairEdit({ wordPair }) {
    const [open, setOpen] = useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <Fragment>
            <IconButton aria-label="Edit" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <WordPairEditDialogContainer
                wordPair={wordPair}
                open={open}
                handleClose={handleClose}
            />
        </Fragment>
    );
}

WordPairEdit.propTypes = {
    wordPair: PropTypes.object.isRequired
};

export default WordPairEdit;
