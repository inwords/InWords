import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import LinksListItem from './LinksListItem';

function LinksList({ authorized, onClick = null }) {
    return (
        <List onClick={onClick}>
            {!authorized ?
                <Fragment>
                    <LinksListItem to="/login" text="Вход" />
                    <LinksListItem to="/register" text="Регистрация" />
                </Fragment> :
                <Fragment>
                    <LinksListItem to="/wordlist" text="Словарь" />
                    <LinksListItem to="/games" text="Игры" />
                </Fragment>}
        </List>
    );
};

LinksList.propTypes = {
    authorized: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
};

export default LinksList;
