import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'src/components/Paper';

import './Popup.scss';

function Popup({ show = false, side = 'left', className, ...rest }) {
  return (
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
  );
}

Popup.propTypes = {
  show: PropTypes.bool,
  side: PropTypes.elementType
};

export default Popup;
