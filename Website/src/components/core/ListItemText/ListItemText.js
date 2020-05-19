import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from 'src/components/core/Typography';

import './ListItemText.scss';

function ListItemText({ primary, secondary, className, ...rest }) {
  return (
    <div
      className={classNames(
        'list-item-text',
        {
          'list-item-text--multiline': primary && secondary
        },
        className
      )}
      {...rest}
    >
      <Typography>{primary}</Typography>
      {secondary && (
        <Typography
          variant="body2"
          color="text-secondary"
          className="list-item-text__secondary"
        >
          {secondary}
        </Typography>
      )}
    </div>
  );
}

ListItemText.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.node,
  className: PropTypes.node
};

export default ListItemText;
