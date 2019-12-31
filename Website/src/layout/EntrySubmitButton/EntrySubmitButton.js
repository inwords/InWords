import React from 'react';
import Button from 'src/components/Button';

import './EntrySubmitButton.css';

function EntrySubmitButton(props) {
  return (
    <Button type="submit" primary className="entry-submit-button" {...props} />
  );
}

export default EntrySubmitButton;
