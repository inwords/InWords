import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'src/utils/debounce';
import Menu from 'src/components/core/Menu';

function ResponsiveMenu({ anchorEl, responsive = true, style = {}, ...rest }) {
  const [maxHeight, setMaxHeight] = React.useState(0);

  React.useEffect(() => {
    if (anchorEl && responsive) {
      const rect = anchorEl.getBoundingClientRect();
      setMaxHeight(window.innerHeight - rect.top - rect.height);

      const handleResize = debounce(() => {
        setMaxHeight(window.innerHeight - rect.top - rect.height);
      }, 200);

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
  responsive: PropTypes.bool
};

export default ResponsiveMenu;
