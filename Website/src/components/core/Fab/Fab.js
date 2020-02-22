import React from 'react';
import classNames from 'classnames';
import ButtonBase from 'src/components/core/ButtonBase';

import './Fab.scss';

function Fab({ className, ...rest }) {
  return <ButtonBase className={classNames('fab', className)} {...rest} />;
}

export default Fab;
