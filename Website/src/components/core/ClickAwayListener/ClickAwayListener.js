import React, { Fragment, cloneElement } from 'react';
import PropTypes from 'prop-types';

import './ClickAwayListener.css';

function ClickAwayListener({
  children,
  onClickAway,
  onClick,
  active = true,
  ...rest
}) {
  const handleClickAway = event => {
    if (onClickAway) {
      onClickAway(event);
    }
  };

  const handleClick = event => {
    event.stopPropagation();

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Fragment>
      {cloneElement(children, {
        onClick: handleClick,
        ...rest
      })}
      {active && (
        <div aria-hidden="true" onClick={handleClickAway} className="overlay" />
      )}
    </Fragment>
  );
}

ClickAwayListener.propTypes = {
  children: PropTypes.node.isRequired,
  onClickAway: PropTypes.func,
  onClick: PropTypes.func,
  active: PropTypes.bool
};

export default ClickAwayListener;
