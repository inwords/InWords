import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import Link from 'src/components/Link';

import './drawer.scss';

function Drawer({ children, open, onClose }) {
  return (
    <>
      <div
        className={classNames('drawer', {
          'drawer--expanded': open
        })}
      >
        {children}
      </div>
      <div
        role="button"
        onClick={onClose}
        onKeyPress={onClose}
        tabIndex={0}
        className={classNames('ui-mask', {
          'ui-mask--visible': open
        })}
      ></div>
    </>
  );
}

Drawer.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Drawer;
