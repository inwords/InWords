import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useDialog from 'src/hooks/useDialog';
import Button from 'src/components/core/Button';
import NicknameEditDialog from './NicknameEditDialog';

function ControlledNicknameEditDialog({ nickname }) {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Fragment>
      <Button onClick={handleOpen} variant="text" color="primary">
        Изменить никнейм
      </Button>
      <NicknameEditDialog
        open={open}
        handleClose={handleClose}
        nickname={nickname}
      />
    </Fragment>
  );
}

ControlledNicknameEditDialog.propTypes = {
  nickname: PropTypes.string
};

export default React.memo(ControlledNicknameEditDialog);
