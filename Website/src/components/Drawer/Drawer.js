import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'src/components/Paper';
import Modal from 'src/components/Modal';

import './Drawer.scss';

const transitionDuration = {
  enter: 225,
  exit: 150
};

function Drawer({ open, onClose, className, ...rest }) {
  return (
    <Modal
      open={open}
      handleBackdropClick={onClose}
      keepMounted
      transitionDuration={transitionDuration[open ? 'enter' : 'exit']}
    >
      <Paper
        component="nav"
        depthShadow={16}
        className={classNames('drawer', className)}
        style={{
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transitionDuration: `${transitionDuration[open ? 'enter' : 'exit']}ms`
        }}
        {...rest}
      />
    </Modal>
  );
}

Drawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default Drawer;
