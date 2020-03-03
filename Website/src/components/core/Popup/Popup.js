import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickAwayListener from 'src/components/core/ClickAwayListener';
import Fade from 'src/components/core/Fade';
import Paper from 'src/components/core/Paper';

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
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
};

export default Popup;
