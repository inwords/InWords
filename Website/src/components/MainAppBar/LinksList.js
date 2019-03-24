import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function LinksList({ accessToken = null, onClick = null }) {
    return (
        <List onClick={onClick}>
            {!accessToken ?
                <Fragment>
                    <ListItem button component={Link} to="/login">
                        <ListItemText primary="Вход" />
                    </ListItem>
                    <ListItem button component={Link} to="/register">
                        <ListItemText primary="Регистрация" />
                    </ListItem>
                </Fragment> :
                <Fragment>
                    <ListItem button component={Link} to="/wordlist">
                        <ListItemText primary="Словарь" />
                    </ListItem>
                    <ListItem button component={Link} to="/game">
                        <ListItemText primary="Игра" />
                    </ListItem>
                </Fragment>}
        </List>
    );
};

LinksList.propTypes = {
    accessToken: PropTypes.string,
    onClick: PropTypes.func
};

export default LinksList;
