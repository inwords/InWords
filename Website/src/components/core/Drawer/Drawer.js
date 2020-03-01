import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'src/components/core/Paper';
import Modal from 'src/components/core/Modal';
import ClickAwayListener from 'src/components/core/ClickAwayListener';

import './Drawer.css';

const transitionDuration = {
  enter: 225,
  exit: 150
};

function Drawer({ open, onClose, className, ...rest }) {
  return (
    <Modal open={open} keepMounted>
      <ClickAwayListener onClickAway={onClose}>
        <Paper
          component="nav"
          depthShadow={16}
          className={classNames('drawer', className)}
          style={{
            transform: open ? 'translateX(0)' : 'translateX(-100%)',
            transition: `transform ${
              transitionDuration[open ? 'enter' : 'exit']
            }ms cubic-bezier(0.4, 0, 0.2, 1)`
          }}
          {...rest}
        />
      </ClickAwayListener>
    </Modal>
  );
}

Drawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default Drawer;
