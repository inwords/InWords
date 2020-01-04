import React from 'react';
import PropTypes from 'prop-types';
import useMaxHeight from 'src/hooks/useMaxHeight';
import Menu from 'src/components/Menu';

function ResponsiveMenu({ anchorEl, style = {}, ...rest }) {
  const maxHeight = useMaxHeight(anchorEl);

  return <Menu style={{ maxHeight, ...style }} {...rest} />;
}

ResponsiveMenu.propTypes = {
  anchorEl: PropTypes.object
};

export default ResponsiveMenu;
