import React from 'react';
import AuthorizedPageContainer from 'src/components/AuthorizedPageContainer';

function TrainingPageContainer({ ...rest }) {
  return <AuthorizedPageContainer {...rest} />;
}

export default TrainingPageContainer;
