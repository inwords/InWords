import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './LinearButton.scss';

function LinearButton({ component = 'button', className, ...rest }) {
  const Component = component;

  return (
    <Component className={classNames('linear-button', className)} {...rest} />
  );
}

LinearButton.propTypes = {
  component: PropTypes.elementType
};

export default LinearButton;
