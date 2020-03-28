import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useCombinedRefs from 'src/hooks/useCombinedRefs';
import Icon from 'src/components/core/Icon';
import IconButton from 'src/components/core/IconButton';

import './Checkbox.scss';

const Checkbox = React.forwardRef(function Checkbox(
  {
    id,
    name,
    tabIndex,
    checked: checkedProp,
    defaultChecked,
    required,
    disabled,
    onChange,
    inputProps,
    className,
    ...rest
  },
  ref
) {
  const { current: isControlled } = React.useRef(Boolean(checkedProp));
  const [checked, setChecked] = React.useState(false);

  const inputRef = React.useRef();
  const combinedRef = useCombinedRefs(ref, inputRef);

  React.useEffect(() => {
    setChecked(inputRef.current.checked);
  }, [inputRef]);

  React.useEffect(() => {
    if (isControlled) {
      setChecked(checkedProp);
    }
  }, [isControlled, checkedProp]);

  const handleInputChange = event => {
    setChecked(event.target.checked);

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <IconButton
      className={className}
      component="span"
      color="primary"
      disabled={disabled}
      {...rest}
    >
      <span
        className={classNames('checkbox', {
          'checkbox--disabled': disabled
        })}
      >
        {checked ? (
          <Icon>check_box</Icon>
        ) : (
          <Icon color="action">check_box_outline_blank</Icon>
        )}
        <input
          ref={combinedRef}
          id={id}
          name={name}
          type="checkbox"
          tabIndex={tabIndex}
          checked={checkedProp}
          defaultChecked={defaultChecked}
          required={required}
          disabled={disabled}
          onChange={handleInputChange}
          className="checkbox__input"
          {...inputProps}
        />
      </span>
    </IconButton>
  );
});

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  tabIndex: PropTypes.number,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  inputProps: PropTypes.object,
  className: PropTypes.string
};

export default Checkbox;
