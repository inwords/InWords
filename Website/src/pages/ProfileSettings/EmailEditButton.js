import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import useDialog from 'hooks/useDialog';
import EmailEditDialog from './EmailEditDialog';

function EmailEditButton() {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <>
      <IconButton aria-label="edit" onClick={handleOpen} edge="end">
        <EditIcon />
      </IconButton>
      <EmailEditDialog open={open} handleClose={handleClose} />
    </>
  );
}

export default EmailEditButton;
