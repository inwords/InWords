import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Toolbar.scss';

function Toolbar({ variant = 'regular', className, ...rest }) {
  return (
    <div
      className={classNames(
        'toolbar',
        `toolbar--variant--${variant}`,
        className
      )}
      {...rest}
    />
  );
}

Toolbar.propTypes = {
  variant: PropTypes.string
};

export default Toolbar;
