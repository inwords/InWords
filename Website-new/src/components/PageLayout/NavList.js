import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import NavListItem from './NavListItem';

function NavList({ authorized, onClick = null, location }) {
    return (
        <List onClick={onClick}>
            {!authorized ? (
                <>
                    <NavListItem to="/signIn" text="Вход" selected={location.pathname === '/signIn'} />
                    <NavListItem to="/signUp" text="Регистрация" selected={location.pathname === '/signUp'} />
                </>
            ) : (
                    <>
                        <NavListItem to="/wordlist" text="Словарь" selected={location.pathname === '/wordlist'} />
                        <NavListItem to="/games" text="Игры" selected={location.pathname === '/games'} />
                    </>
                )}
        </List>
    );
}

NavList.propTypes = {
    authorized: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    location: PropTypes.object.isRequired
};

export default withRouter(NavList);
