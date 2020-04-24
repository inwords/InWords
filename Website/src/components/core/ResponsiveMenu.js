import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import debounce from 'src/utils/debounce';
import Menu from 'src/components/core/Menu';

const RESIZE_DELAY = 200;

function ResponsiveMenu({ anchorEl, responsive = true, style, ...rest }) {
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (anchorEl && responsive) {
      const rect = anchorEl.getBoundingClientRect();
      setMaxHeight(window.innerHeight - rect.top - rect.height);

      const handleResize = debounce(() => {
        setMaxHeight(window.innerHeight - rect.top - rect.height);
      }, RESIZE_DELAY);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [anchorEl, responsive]);

  return <Menu style={{ maxHeight, ...style }} {...rest} />;
}

ResponsiveMenu.propTypes = {
  anchorEl: PropTypes.object,
  responsive: PropTypes.bool,
  style: PropTypes.object
};

export default ResponsiveMenu;
