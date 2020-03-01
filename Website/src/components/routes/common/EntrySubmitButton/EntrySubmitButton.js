import React from 'react';
import Button from 'src/components/core/Button';

import './EntrySubmitButton.css';

function EntrySubmitButton(props) {
  return (
    <Button
      type="submit"
      color="primary"
      fullWidth
      className="entry-submit-button"
      {...props}
    />
  );
}

export default EntrySubmitButton;
