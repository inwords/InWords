import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'src/components/core/Button';

import './LinkButton.scss';

function LinkButton({
  component = 'a',
  disabled = false,
  className,
  children,
  ...rest
}) {
  return (
    <Button
      component={component}
      className={classNames(
        'link-button',
        {
          'link-button--disabled': disabled
        },
        className
      )}
      {...rest}
    >
      <span className="link-button__text">{children}</span>
    </Button>
  );
}

LinkButton.propTypes = {
  component: PropTypes.elementType,
  disabled: PropTypes.bool
};

export default LinkButton;
