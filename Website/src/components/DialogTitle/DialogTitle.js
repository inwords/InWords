import React from 'react';
import classNames from 'classnames';
import Typography from 'src/components/Typography';

import './DialogTitle.css';

function DialogTitle({ children, className, ...rest }) {
  return (
    <div className={classNames('dialog-title', className)} {...rest}>
      <Typography as="h2" variant="h6">
        {children}
      </Typography>
    </div>
  );
}

export default DialogTitle;
