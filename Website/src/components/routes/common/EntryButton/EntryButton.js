import React from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/core/Button';

import './EntryButton.css';

function EntryButton({ color = 'primary', ...rest }) {
  return <Button color={color} fullWidth className="entry-button" {...rest} />;
}

EntryButton.propTypes = {
  color: PropTypes.string
};

export default EntryButton;
