import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import LinksListItem from './LinksListItem';

function LinksList({ authorized, onClick }) {
    return (
        <List onClick={onClick}>
            {!authorized ?
                <Fragment>
                    <LinksListItem to="/login" text="Вход" />
                    <LinksListItem to="/register" text="Регистрация" />
                </Fragment> :
                <Fragment>
                    <LinksListItem to="/wordlist" text="Словарь" />
                    <LinksListItem to="/my_games" text="Мои игры" />
                    <LinksListItem to="/games_catalog" text="Каталог игр" />
                </Fragment>}
        </List>
    );
};

LinksList.propTypes = {
    authorized: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default LinksList;
