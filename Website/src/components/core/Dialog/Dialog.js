import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from 'src/components/core/Modal';
import ClickAwayListener from 'src/components/core/ClickAwayListener';
import FadeAnimation from 'src/components/core/FadeAnimation';
import Fade from 'src/components/core/Fade';
import Paper from 'src/components/core/Paper';

import './Dialog.scss';

function Dialog({ open, onClose, className, ...rest }) {
  return (
    <Modal open={open} onClick={onClose}>
      <FadeAnimation>
        <Fade in={open}>
          <div className={classNames('dialog', className)}>
            <ClickAwayListener>
              <Paper
                className="dialog__paper"
                role="dialog"
                depthShadow={64}
                {...rest}
              />
            </ClickAwayListener>
          </div>
        </Fade>
      </FadeAnimation>
    </Modal>
  );
}

Dialog.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func
};

export default Dialog;
