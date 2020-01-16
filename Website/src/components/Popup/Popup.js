import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickAwayListener from 'src/components/ClickAwayListener';
import Paper from 'src/components/Paper';

import './Popup.scss';

function Popup({ show = false, side = 'left', onClose, className, ...rest }) {
  return (
    <ClickAwayListener active={show} onClickAway={onClose}>
      <Paper
        depthShadow={8}
        className={classNames(
          'popup',
          `popup--side--${side}`,
          {
            'popup--visible': show
          },
          className
        )}
        {...rest}
      />
    </ClickAwayListener>
  );
}

Popup.propTypes = {
  show: PropTypes.bool,
  side: PropTypes.elementType,
  onClose: PropTypes.func
};

export default Popup;
