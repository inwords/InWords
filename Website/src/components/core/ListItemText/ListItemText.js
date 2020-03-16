import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from 'src/components/core/Typography';

import './ListItemText.scss';

function ListItemText({ primary, secondary, className, ...rest }) {
  return (
    <div className={classNames('list-item-text', className)} {...rest}>
      <Typography>{primary}</Typography>
      {secondary && (
        <Typography
          className="list-item-text__secondary"
          color="text-secondary"
        >
          {secondary}
        </Typography>
      )}
    </div>
  );
}

ListItemText.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  className: PropTypes.string
};

export default ListItemText;
