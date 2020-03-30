import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'src/components/core/Drawer';
import Divider from 'src/components/core/Divider';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Space from 'src/components/core/Space';
import BrandLink from 'src/components/layout/BrandLink';
import DrawerNavList from './DrawerNavList';

import './NavDrawer.scss';

function NavDrawer({ open, handleClose, routes }) {
  return (
    <Drawer
      className="nav-drawer"
      role="navigation"
      open={open}
      onClose={handleClose}
    >
      <div className="nav-drawer__header">
        <IconButton
          aria-label="side-nav-menu"
          onClick={handleClose}
          edge="start"
          color="inherit"
        >
          <Icon>menu</Icon>
        </IconButton>
        <Space value={2} />
        <BrandLink>InWords</BrandLink>
      </div>
      <Divider />
      <DrawerNavList handleClose={handleClose} routes={routes} />
    </Drawer>
  );
}

NavDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  routes: PropTypes.array
};

export default NavDrawer;
