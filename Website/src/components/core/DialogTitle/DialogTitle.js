import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from 'src/components/core/Typography';

import './DialogTitle.css';

function DialogTitle({ children, className, ...rest }) {
  return (
    <div className={classNames('dialog-title', className)} {...rest}>
      <Typography component="h2" variant="h6">
        {children}
      </Typography>
    </div>
  );
}

DialogTitle.propTypes = {
  className: PropTypes.string
};

export default DialogTitle;
