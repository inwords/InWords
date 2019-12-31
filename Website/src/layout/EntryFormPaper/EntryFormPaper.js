import React from 'react';
import FormPaper from 'src/layout/FormPaper';

import './EntryFormPaper.scss';

function EntryFormPaper({ className, ...rest }) {
  return <FormPaper className="entry-form-paper" {...rest} />;
}

export default EntryFormPaper;
