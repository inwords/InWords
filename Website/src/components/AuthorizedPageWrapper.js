import React from 'react';
import ProfileMenuButton from 'src/components/ProfileMenuButton';
import PageWrapper from 'src/components/PageWrapper';

const mainRoutes = [
  {
    to: '/dictionary',
    text: 'Словарь'
  },
  {
    to: '/trainings',
    text: 'Обучение'
  }
];

function AuthorizedPageWrapper({ ...rest }) {
  return (
    <PageWrapper
      mainRoutes={mainRoutes}
      rightNodes={[<ProfileMenuButton key={0} />]}
      {...rest}
    />
  );
}

export default AuthorizedPageWrapper;
