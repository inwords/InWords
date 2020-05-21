import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
  const elementRef = useRef(null);

  useEffect(() => {
    const outsideClickListener = event => {
      if (!elementRef.current.contains(event.target) && show) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('click', outsideClickListener);

      return () => {
        document.removeEventListener('click', outsideClickListener);
      };
    }
  }, [show, onClose]);

  return (
    <Fade in={show}>
      <Paper
        ref={elementRef}
        depthShadow={8}
        className={classNames('popup', `popup--side--${side}`, className)}
        {...rest}
      >
        {children}
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
