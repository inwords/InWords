import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useDialog from 'src/components/core/useDialog';
import Button from 'src/components/core/Button';
import AccountDeleteDialog from './AccountDeleteDialog';

import './ControlledAccountDeleteDialog.css';

function ControlledAccountDeleteDialog({ nickname }) {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Fragment>
      <Button
        onClick={handleOpen}
        variant="text"
        className="account-delete-button"
      >
        Удалить аккаунт
      </Button>
      <AccountDeleteDialog
        open={open}
        handleClose={handleClose}
        nickname={nickname}
      />
    </Fragment>
  );
}

ControlledAccountDeleteDialog.propTypes = {
  nickname: PropTypes.string
};

export default React.memo(ControlledAccountDeleteDialog);
