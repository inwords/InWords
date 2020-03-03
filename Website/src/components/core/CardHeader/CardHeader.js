import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from 'src/components/core/Typography';

import './CardHeader.scss';

function CardHeader({ title, action, className, ...rest }) {
  return (
    <div className={classNames('card-header', className)} {...rest}>
      {title && (
        <div className="card-header__content">
          <Typography component="span" variant="h6">
            {title}
          </Typography>
        </div>
      )}
      {action && <div className="card-header__action">{action}</div>}
    </div>
  );
}

CardHeader.propTypes = {
  title: PropTypes.string,
  action: PropTypes.node,
  className: PropTypes.string
};

export default CardHeader;
