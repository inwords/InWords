import React from 'react';
import PropTypes from 'prop-types';
import useScrollShow from 'src/hooks/useScrollShow';
import DynamicWrapper from 'src/components/DynamicWrapper';

function DynamicToolbarWrapper({ children }) {
  const show = useScrollShow(false, 128, true);

  return <DynamicWrapper show={show}>{children}</DynamicWrapper>;
}

DynamicToolbarWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default DynamicToolbarWrapper;
