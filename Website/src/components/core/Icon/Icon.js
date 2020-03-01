import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Icon.scss';

function Icon({ color, fontSize, className, ...rest }) {
  return (
    <i
      className={classNames(
        'icon',
        {
          [`icon--color--${color}`]: color,
          [`icon--font-size--${fontSize}`]: fontSize
        },
        className
      )}
      {...rest}
    />
  );
}

Icon.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.string
};

export default Icon;
