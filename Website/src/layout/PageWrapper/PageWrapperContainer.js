import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import PageWrapper from './PageWrapper';

const routesUnauthorized = [
  {
    to: '/signIn',
    text: 'Вход'
  },
  {
    to: '/signUp',
    text: 'Регистрация'
  }
];

const nestedRoutesMap = {
  signIn: [
    {
      to: '/aa',
      text: 'aa'
    },
    {
      to: '/bb',
      text: 'bb'
    }
  ]
};

function PageWrapperContainer({ match, ...rest }) {
  const location = useLocation();

  return (
    <PageWrapper
      sideRoutes={nestedRoutesMap[location.pathname.split('/')[1]]}
      {...rest}
    />
  );
}

PageWrapperContainer.propTypes = {};

export default PageWrapperContainer;
