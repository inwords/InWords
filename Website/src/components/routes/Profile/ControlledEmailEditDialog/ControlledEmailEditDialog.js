import React, { Fragment } from 'react';
import useDialog from 'src/components/core/useDialog';
import Button from 'src/components/core/Button';
import EmailEditDialog from './EmailEditDialog';

function ControlledEmailEditDialog() {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Fragment>
      <Button onClick={handleOpen} variant="text" color="primary">
        Изменить электронный адрес
      </Button>
      <EmailEditDialog open={open} handleClose={handleClose} />
    </Fragment>
  );
}

export default React.memo(ControlledEmailEditDialog);
