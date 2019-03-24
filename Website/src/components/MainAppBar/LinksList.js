import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLink from '../ListItemLink';

function LinksList({ accessToken = null, onClick = null }) {
    return (
        <List onClick={onClick}>
            {!accessToken ?
                <Fragment>
                    <ListItemLink href="#login">
                        <ListItemText primary="Вход" />
                    </ListItemLink>
                    <ListItemLink href="#register">
                        <ListItemText primary="Регистрация" />
                    </ListItemLink>
                </Fragment> :
                <Fragment>
                    <ListItemLink href="#wordlist">
                        <ListItemText primary="Словарь" />
                    </ListItemLink>
                    <ListItemLink href="#game">
                        <ListItemText primary="Игра" />
                    </ListItemLink>
                    <ListItemLink href="#account">
                        <ListItemText primary="Профиль" />
                    </ListItemLink>
                </Fragment>}
        </List>
    );
};

LinksList.propTypes = {
    accessToken: PropTypes.string,
    onClick: PropTypes.func
};

export default LinksList;
