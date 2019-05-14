import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List/index';
import NavListItem from './NavListItem';

function NavList({ authorized, onClick = null, location }) {
    return (
        <List onClick={onClick}>
            {!authorized ? (
                <>
                    <NavListItem to="/login" text="Вход" selected={location.pathname === '/login'} />
                    <NavListItem to="/register" text="Регистрация" selected={location.pathname === '/register'} />
                </>) : (
                    <>
                        <NavListItem to="/wordlist" text="Словарь" selected={location.pathname === '/wordlist'} />
                        <NavListItem to="/games/0" text="Игры" selected={location.pathname.startsWith('/games')} />
                    </>)}
        </List>
    );
}

NavList.propTypes = {
    authorized: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    location: PropTypes.object.isRequired
};

export default withRouter(NavList);
