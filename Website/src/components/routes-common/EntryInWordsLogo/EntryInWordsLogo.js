import React from 'react';
import InWordsLogo from 'src/components/routes-common/InWordsLogo';

import './EntryInWordsLogo.css';

function EntryInWordsLogo() {
  return (
    <a href="/">
      <InWordsLogo height="64" className="entry-in-words-logo" />
    </a>
  );
}

export default EntryInWordsLogo;
