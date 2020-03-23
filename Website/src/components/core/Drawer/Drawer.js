import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'src/components/core/Paper';
import Modal from 'src/components/core/Modal';
import ClickAwayListener from 'src/components/core/ClickAwayListener';

import './Drawer.css';

const transitionDuration = {
  enter: 'var(--transition-duration-entering-screen)',
  exit: 'var(--transition-duration-leaving-screen)'
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
            } var(--transition-easing-ease-in-out)`
          }}
          {...rest}
        />
      </ClickAwayListener>
    </Modal>
  );
}

Drawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string
};

export default Drawer;
