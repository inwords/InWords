import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useDialog from 'src/components/core/useDialog';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import AuditionTrainingSettingsDialog from './AuditionTrainingSettingsDialog';

function ControlledAuditionTrainingSettingsDialog(props) {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Fragment>
      <IconButton onClick={handleOpen} edge="end">
        <Icon>settings</Icon>
      </IconButton>
      <AuditionTrainingSettingsDialog
        open={open}
        handleClose={handleClose}
        {...props}
      />
    </Fragment>
  );
}

ControlledAuditionTrainingSettingsDialog.propTypes = {
  trainingSettings: PropTypes.object.isRequired,
  setTrainingSettings: PropTypes.func
};

export default ControlledAuditionTrainingSettingsDialog;
