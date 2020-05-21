import React, { Fragment } from 'react';
import useDialog from 'src/components/core/useDialog';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import CardsGameSettingsDialog from './CardsGameSettingsDialog';

function ControlledCardsGameSettingsDialog(props) {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Fragment>
      <IconButton onClick={handleOpen} edge="end">
        <Icon>settings</Icon>
      </IconButton>
      <CardsGameSettingsDialog
        open={open}
        handleClose={handleClose}
        {...props}
      />
    </Fragment>
  );
}

export default ControlledCardsGameSettingsDialog;
