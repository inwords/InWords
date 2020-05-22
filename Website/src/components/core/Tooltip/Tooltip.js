import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PopupContainer from 'src/components/core/PopupContainer';

import './Tooltip.scss';

function Tooltip({
  children,
  id,
  title,
  placement = 'bottom',
  className,
  ...rest
}) {
  const childrenProps = {
    'aria-labelledby': id,
    className: 'tooltip-subject'
  };

  return (
    <PopupContainer className={classNames('tooltip-container', className)}>
      {cloneElement(children, childrenProps)}
      <div
        role="tooltip"
        id={id}
        className={classNames('tooltip', `tooltip--placement--${placement}`)}
        {...rest}
      >
        {title}
      </div>
    </PopupContainer>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  placement: PropTypes.string,
  className: PropTypes.string
};

export default Tooltip;
