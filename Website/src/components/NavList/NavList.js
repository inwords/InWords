import React, { memo } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import NavListItem from './NavListItem';

const linksWhenUnauthorized = [
  {
    to: '/signIn',
    text: 'Вход'
  },
  {
    to: '/signUp',
    text: 'Регистрация'
  }
];

const linksWhenAuthorized = [
  {
    to: '/wordlist',
    text: 'Словарь'
  },
  {
    to: '/trainingCategories',
    text: 'Обучение'
  }
];

function NavList({ authorized, onClick = null }) {
  return (
    <List onClick={onClick}>
      {!authorized
        ? linksWhenUnauthorized.map(link => (
            <NavListItem key={link.to} to={link.to} text={link.text} />
          ))
        : linksWhenAuthorized.map(link => (
            <NavListItem key={link.to} to={link.to} text={link.text} />
          ))}
    </List>
  );
}

NavList.propTypes = {
  authorized: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

export default memo(NavList);
