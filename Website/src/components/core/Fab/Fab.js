import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonBase from 'src/components/core/ButtonBase';

import './Fab.scss';

function Fab({ className, ...rest }) {
  return <ButtonBase className={classNames('fab', className)} {...rest} />;
}

Fab.propTypes = {
  className: PropTypes.string
};

export default Fab;
