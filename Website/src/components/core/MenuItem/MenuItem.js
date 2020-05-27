import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonBase from 'src/components/core/ButtonBase';

import './MenuItem.scss';

function MenuItem({ className, ...rest }) {
  return (
    <ButtonBase className={classNames('menu-item', className)} {...rest} />
  );
}

MenuItem.propTypes = {
  className: PropTypes.string
};

export default MenuItem;
