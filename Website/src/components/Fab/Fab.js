import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Fab.scss';

function Fab({ component = 'button', className, ...rest }) {
  const Component = component;

  return <Component className={classNames('fab', className)} {...rest} />;
}

Fab.propTypes = {
  component: PropTypes.elementType
};

export default Fab;
