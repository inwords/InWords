import React from 'react';
import AuthorizedPageContainer from 'src/components/AuthorizedPageContainer';

const trainingSideRoutes = [
  {
    to: '/training/all',
    text: 'Категории'
  },
  {
    to: '/training/history',
    text: 'История'
  }
];

function TrainingPageContainer({ ...rest }) {
  return <AuthorizedPageContainer sideRoutes={trainingSideRoutes} {...rest} />;
}

export default TrainingPageContainer;
