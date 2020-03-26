import React from 'react';
import PropTypes from 'prop-types';

import './EntryButtonContainer.css';

function EntryButtonContainer({ children }) {
  return <div className="entry-button-container">{children}</div>;
}

EntryButtonContainer.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string
};

export default EntryButtonContainer;
