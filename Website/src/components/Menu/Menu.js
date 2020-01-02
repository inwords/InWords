import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'src/utils/debounce';

import './Menu.css';

function Menu({ component = 'ul', anchorEl, className, ...rest }) {
  const [maxHeight, setMaxHeight] = React.useState(0);

  React.useEffect(() => {
    if (anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      setMaxHeight(window.innerHeight - rect.top - rect.height);

      const handleResize = debounce(() => {
        setMaxHeight(window.innerHeight - rect.top - rect.height);
      }, 20);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [anchorEl]);

  const Component = component;

  return (
    <Component
      className={classNames('menu', className)}
      style={{ maxHeight }}
      {...rest}
    />
  );
}

Menu.propTypes = {
  component: PropTypes.elementType,
  anchorEl: PropTypes.object
};

export default Menu;
