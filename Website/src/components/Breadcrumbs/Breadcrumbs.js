import React, { Fragment } from 'react';
import classNames from 'classnames';
import Icon from 'src/components/Icon';

import './Breadcrumbs.scss';

function Breadcrumbs({ children, className, ...rest }) {
  if (!children) return;

  const separators = Array(React.Children.count(children) - 1).fill(
    <li aria-hidden="true" className="breadcrumbs__list-item-separator">
      <Icon>navigate_next</Icon>
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
