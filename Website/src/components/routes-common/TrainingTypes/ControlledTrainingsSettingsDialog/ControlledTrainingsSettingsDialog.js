import React, { Fragment } from 'react';
import useDialog from 'src/components/core/useDialog';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import TrainingsSettingsDialog from './TrainingsSettingsDialog';

function ControlledTrainingsSettingsDialog() {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Fragment>
      <IconButton onClick={handleOpen} edge="end">
        <Icon>settings</Icon>
      </IconButton>
      <TrainingsSettingsDialog open={open} handleClose={handleClose} />
    </Fragment>
  );
}

export default ControlledTrainingsSettingsDialog;
