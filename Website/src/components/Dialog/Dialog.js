import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from 'src/components/Modal';
import Fade from 'src/components/Fade';
import Paper from 'src/components/Paper';

import './Dialog.scss';

function Dialog({ open, onClose, className, ...rest }) {
  return (
    <Modal open={open} onClick={onClose}>
      <Fade in={open}>
        <div className={classNames('dialog', className)}>
          <Paper
            className="dialog__paper"
            onClick={event => {
              event.stopPropagation();
            }}
            role="dialog"
            depthShadow={64}
            {...rest}
          />
        </div>
      </Fade>
    </Modal>
  );
}

Dialog.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func
};

export default Dialog;
