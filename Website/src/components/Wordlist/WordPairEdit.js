import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import WordPairEditDialog from './WordPairEditDialog';

function WordPairEdit({ handleOpen, ...rest }) {
    return (
        <Fragment>
            <IconButton aria-label="Edit" onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <WordPairEditDialog
                {...rest}
            />
        </Fragment>
    );
}

WordPairEdit.propTypes = {
    handleOpen: PropTypes.func.isRequired
};

export default WordPairEdit;
