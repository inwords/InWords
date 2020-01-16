import React from 'react';
import PropTypes from 'prop-types';

const touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

function ClickAwayListener({
  children,
  onClickAway,
  active = true,
  onClick,
  onTouchStart,
  ...rest
}) {
  React.useEffect(() => {
    const handleClickAway = event => {
      if (onClickAway) {
        onClickAway(event);
      }
    };

    if (active) {
      window.addEventListener(touchEvent, handleClickAway);

      return () => {
        window.removeEventListener(touchEvent, handleClickAway);
      };
    }
  }, [active, onClickAway]);

  const childProps = {};
  if (touchEvent === 'touchstart') {
    childProps.onTouchStart = event => {
      event.stopPropagation();

      if (onTouchStart) {
        onTouchStart(event);
      }
    };
  } else {
    childProps.onClick = event => {
      event.stopPropagation();

      if (onClick) {
        onClick(event);
      }
    };
  }

  return React.cloneElement(children, {
    ...childProps,
    ...rest
  });
}

ClickAwayListener.propTypes = {
  children: PropTypes.node.isRequired,
  onClickAway: PropTypes.func,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  onTouchStart: PropTypes.func
};

export default ClickAwayListener;
