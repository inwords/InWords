import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useDialog from 'src/hooks/useDialog';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import WordPairsDeleteDialog from './WordPairsDeleteDialog';

import './ControlledWordPairsDeleteDialog.css';

function ControlledWordPairsDeleteDialog(props) {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Fragment>
      <IconButton
        aria-label="delete"
        onClick={handleOpen}
        className="word-pairs-delete-button"
      >
        <Icon>delete</Icon>
      </IconButton>
      <WordPairsDeleteDialog open={open} handleClose={handleClose} {...props} />
    </Fragment>
  );
}

ControlledWordPairsDeleteDialog.propTypes = {
  checkedValues: PropTypes.array,
  handleReset: PropTypes.func
};

export default ControlledWordPairsDeleteDialog;
