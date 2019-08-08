import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import useDialog from 'hooks/useDialog';
import WordPairEditDialog from './WordPairEditDialog';

function WordPairEditButton({ visible, ...rest }) {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Box display={visible ? 'block' : 'none'}>
      <IconButton aria-label="edit" onClick={handleOpen} edge="end">
        <EditIcon />
      </IconButton>
      <WordPairEditDialog open={open} handleClose={handleClose} {...rest} />
    </Box>
  );
}

WordPairEditButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  wordPair: PropTypes.object
};

export default WordPairEditButton;
