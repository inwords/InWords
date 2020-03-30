import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useDrawer from 'src/hooks/useDrawer';
import Icon from 'src/components/core/Icon';
import IconButton from 'src/components/core/IconButton';
import NavDrawer from './NavDrawer';

function ControlledNavDrawer({ routes, className }) {
  const { open, handleOpen, handleClose } = useDrawer();

  return (
    <Fragment>
      <IconButton
        aria-label="side-nav-menu"
        onClick={handleOpen}
        edge="start"
        color="inherit"
        className={className}
      >
        <Icon>menu</Icon>
      </IconButton>
      <NavDrawer open={open} handleClose={handleClose} routes={routes} />
    </Fragment>
  );
}

ControlledNavDrawer.propTypes = {
  routes: PropTypes.array,
  className: PropTypes.string
};

export default ControlledNavDrawer;
