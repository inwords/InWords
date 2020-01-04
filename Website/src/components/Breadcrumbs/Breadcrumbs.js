import React, { Fragment } from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import classNames from 'classnames';

import './Breadcrumbs.scss';

function Breadcrumbs({ children, className, ...rest }) {
  if (!children) return;

  const separators = Array(React.Children.count(children) - 1).fill(
    <li aria-hidden="true" className="breadcrumbs__list-item-separator">
      <NavigateNextIcon />
    </li>
  );

  return (
    <div className={classNames('breadcrumbs', className)} {...rest}>
      <ol className="breadcrumbs__list">
        {React.Children.map(children, child => (
          <Fragment>
            <li className="breadcrumbs__list-item">
              {React.cloneElement(child)}
            </li>
            {separators.pop()}
          </Fragment>
        ))}
      </ol>
    </div>
  );
}

export default Breadcrumbs;
