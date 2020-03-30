import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useDialog from 'src/components/core/useDialog';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import GameSettingsDialog from './GameSettingsDialog';

function ControlledGameSettingsDialog(props) {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Fragment>
      <IconButton onClick={handleOpen} edge="start">
        <Icon>settings</Icon>
      </IconButton>
      <GameSettingsDialog open={open} handleClose={handleClose} {...props} />
    </Fragment>
  );
}

ControlledGameSettingsDialog.propTypes = {
  trainingSettings: PropTypes.object.isRequired,
  setTrainingSettings: PropTypes.func
};

export default ControlledGameSettingsDialog;
