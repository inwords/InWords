import React, { Fragment, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from 'src/components/core/Icon';

import './Breadcrumbs.scss';

function Breadcrumbs({ children, className, ...rest }) {
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
            <li className="breadcrumbs__list-item">{cloneElement(child)}</li>
            {separators.pop()}
          </Fragment>
        ))}
      </ol>
    </div>
  );
}

Breadcrumbs.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Breadcrumbs;
