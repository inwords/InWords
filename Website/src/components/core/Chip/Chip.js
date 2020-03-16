import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonBase from 'src/components/core/ButtonBase';

import './Chip.scss';

function Chip({ component = 'div', className, ...rest }) {
  const chipProps = {};
  if (component !== 'button') {
    chipProps.role = 'button';
  }

  return (
    <ButtonBase
      className={classNames('chip', className)}
      {...chipProps}
      {...rest}
    />
  );
}

Chip.propTypes = {
  component: PropTypes.elementType,
  className: PropTypes.string
};

export default Chip;
