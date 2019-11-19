import React from 'react';
import ProfileMenuButton from 'src/components/ProfileMenuButton';
import PageContainer from 'src/components/PageContainer';

const mainRoutes = [
  {
    to: '/dictionary',
    text: 'Словарь'
  },
  {
    to: '/training/all',
    text: 'Обучение'
  }
];

function AuthorizedPageContainer({ ...rest }) {
  return (
    <PageContainer
      mainRoutes={mainRoutes}
      rightNodes={[<ProfileMenuButton key={0} />]}
      {...rest}
    />
  );
}

export default AuthorizedPageContainer;
