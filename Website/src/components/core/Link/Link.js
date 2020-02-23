import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from 'src/components/core/Typography';

import './Link.scss';

function Link({ component = 'a', color = 'primary', className, ...rest }) {
  return (
    <Typography
      component={component}
      color={color}
      className={classNames('link', className)}
      {...rest}
    />
  );
}

Link.propTypes = {
  component: PropTypes.elementType,
  color: PropTypes.string
};

export default Link;
