import React from 'react';
import PropTypes from 'prop-types';
import useScrollShow from 'src/hooks/useScrollShow';
import AppBar from 'src/components/AppBar';

function InvertedDynamicAppBar({ children, ...rest }) {
  const show = useScrollShow(false, 128, true);

  return (
    <AppBar show={show} {...rest}>
      {children}
    </AppBar>
  );
}

InvertedDynamicAppBar.propTypes = {
  children: PropTypes.node.isRequired
};

export default InvertedDynamicAppBar;
