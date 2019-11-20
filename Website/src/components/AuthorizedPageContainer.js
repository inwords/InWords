import React from 'react';
import ProfileMenuButton from 'src/components/ProfileMenuButton';
import PageContainer from 'src/components/PageContainer';

const routes = [
  {
    to: '/dictionary',
    text: 'Словарь'
  },
  {
    to: '/training',
    text: 'Обучение'
  }
];

function AuthorizedPageContainer({ ...rest }) {
  return (
    <PageContainer
      routes={routes}
      rightNodes={[<ProfileMenuButton key={0} />]}
      {...rest}
    />
  );
}

export default AuthorizedPageContainer;
