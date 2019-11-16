import React from 'react';
import AuthorizedPageWrapper from 'src/components/AuthorizedPageWrapper';

function TrainingPageWrapper({ ...rest }) {
  return <AuthorizedPageWrapper {...rest} />;
}

export default TrainingPageWrapper;
