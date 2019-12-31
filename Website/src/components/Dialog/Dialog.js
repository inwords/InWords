import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from 'src/components/Modal';
import Paper from 'src/components/Paper';

import './Dialog.scss';

const transitionDuration = {
  enter: 0,
  exit: 150
};

function Dialog({ open, onClose, className, ...rest }) {
  return (
    <Modal
      open={open}
      onClick={onClose}
      transitionDuration={transitionDuration[open ? 'enter' : 'exit']}
    >
      <div
        className="dialog"
        style={{
          opacity: open ? 1 : 0,
          transitionDuration: `${transitionDuration[open ? 'enter' : 'exit']}ms`
        }}
      >
        <Paper
          className={classNames('dialog__paper', className)}
          onClick={event => {
            event.stopPropagation();
          }}
          role="dialog"
          depthShadow={64}
          {...rest}
        />
      </div>
    </Modal>
  );
}

Dialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default Dialog;
