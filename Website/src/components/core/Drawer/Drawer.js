import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'src/components/core/Paper';
import Modal from 'src/components/core/Modal';

import './Drawer.css';

const transitionDuration = {
  enter: 'var(--transition-duration-entering-screen)',
  exit: 'var(--transition-duration-leaving-screen)'
};

function Drawer({ open, onClose, className, ...rest }) {
  const handleClick = event => {
    event.stopPropagation();
  };

  return (
    <Modal open={open} onClick={onClose} keepMounted>
      <Paper
        component="nav"
        onClick={handleClick}
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
    </Modal>
  );
}

Drawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string
};

export default Drawer;
