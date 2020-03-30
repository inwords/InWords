import React, { Fragment } from 'react';
import useDialog from 'src/components/core/useDialog';
import Button from 'src/components/core/Button';
import AvatarEditDialog from './AvatarEditDialog';

function ControlledAvatarEditDialog() {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Fragment>
      <Button onClick={handleOpen} variant="text" color="primary">
        Изменить аватар
      </Button>
      <AvatarEditDialog open={open} handleClose={handleClose} />
    </Fragment>
  );
}

export default React.memo(ControlledAvatarEditDialog);
