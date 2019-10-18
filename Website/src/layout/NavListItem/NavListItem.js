import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';

import './nav-list-item.scss';

function NavListItem({ children, className, ...rest }) {
  return (
    <li
      className={classNames('nav-list__item', {
        [className]: Boolean(className)
      })}
    >
      <RouterLink {...rest} className="nav-list__link">
        {children}
      </RouterLink>
    </li>
  );
}

NavListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default NavListItem;
