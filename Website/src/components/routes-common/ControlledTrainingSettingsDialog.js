import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useDialog from 'src/components/core/useDialog';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';

function ControlledTrainingSettingsDialog({ component: Component, ...rest }) {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Fragment>
      <IconButton onClick={handleOpen} edge="end">
        <Icon>settings</Icon>
      </IconButton>
      <Component open={open} handleClose={handleClose} {...rest} />
    </Fragment>
  );
}

ControlledTrainingSettingsDialog.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default ControlledTrainingSettingsDialog;
