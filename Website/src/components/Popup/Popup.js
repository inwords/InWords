import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickAwayListener from 'src/components/ClickAwayListener';
import Fade from 'src/components/Fade';
import Paper from 'src/components/Paper';

import './Popup.scss';

function Popup({
  show = false,
  side = 'left',
  onClose,
  children,
  className,
  ...rest
}) {
  return (
    <Fade in={show}>
      <Paper
        depthShadow={8}
        className={classNames('popup', `popup--side--${side}`, className)}
        {...rest}
      >
        <ClickAwayListener active={show} onClickAway={onClose}>
          {children}
        </ClickAwayListener>
      </Paper>
    </Fade>
  );
}

Popup.propTypes = {
  show: PropTypes.bool,
  side: PropTypes.elementType,
  onClose: PropTypes.func
};

export default Popup;
