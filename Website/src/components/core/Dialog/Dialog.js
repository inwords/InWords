import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from 'src/components/core/Modal';
import FadeAnimation from 'src/components/core/FadeAnimation';
import Fade from 'src/components/core/Fade';
import Paper from 'src/components/core/Paper';

import './Dialog.scss';

function Dialog({ open, onClose, className, ...rest }) {
  const handleClick = event => {
    event.stopPropagation();
  };

  return (
    <Modal open={open} onClick={onClose}>
      <FadeAnimation>
        <Fade in={open}>
          <div className={classNames('dialog', className)}>
            <Paper
              onClick={handleClick}
              role="dialog"
              depthShadow={64}
              className="dialog__paper"
              {...rest}
            />
          </div>
        </Fade>
      </FadeAnimation>
    </Modal>
  );
}

Dialog.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  className: PropTypes.string
};

export default Dialog;
