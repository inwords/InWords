import React from 'react';
import PropTypes from 'prop-types';
import useScrollShow from 'src/hooks/useScrollShow';
import AppBar from 'src/components/AppBar';

function DynamicAppBar({ children, ...rest }) {
  const show = useScrollShow(true, 64);

  return (
    <AppBar show={show} {...rest}>
      {children}
    </AppBar>
  );
}

DynamicAppBar.propTypes = {
  children: PropTypes.node.isRequired
};

export default DynamicAppBar;
