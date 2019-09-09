import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import useDialog from 'hooks/useDialog';
import WordPairEditDialog from './WordPairEditDialog';

function WordPairEditButton({ handleReset, ...rest }) {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <>
      <IconButton
        aria-label="edit"
        onClick={() => {
          handleOpen();
          handleReset();
        }}
        edge="end"
      >
        <EditIcon />
      </IconButton>
      <WordPairEditDialog open={open} handleClose={handleClose} {...rest} />
    </>
  );
}

WordPairEditButton.propTypes = {
  handleReset: PropTypes.func.isRequired,
  wordPair: PropTypes.object
};

export default WordPairEditButton;
