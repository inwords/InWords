import React from 'react';
import ListItemButton from 'src/components/ListItemButton';

const MenuItem = React.forwardRef((props, ref) => {
  return <ListItemButton ref={ref} role="menuitem" {...props} />;
});

export default MenuItem;
