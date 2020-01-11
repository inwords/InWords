import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'src/components/Button';

import './LinkButton.scss';

function LinkButton({ component = 'a', disabled = false, className, ...rest }) {
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
    />
  );
}

LinkButton.propTypes = {
  component: PropTypes.elementType,
  disabled: PropTypes.bool
};

export default LinkButton;
