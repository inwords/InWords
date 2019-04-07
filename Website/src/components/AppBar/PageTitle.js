import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    grow: {
        flexGrow: 1,
    },
};

function PageTitle({ location, classes }) {
    return (
        <Typography noWrap variant="h6" color="inherit" className={classes.grow}>
            {(() => {
                if (location.pathname === '/login') {
                    return 'Вход';
                } else if (location.pathname === '/register') {
                    return 'Регистрация';
                } else if (location.pathname === '/wordlist') {
                    return 'Словарь';
                } else if (location.pathname === '/my_games') {
                    return 'Мои игры';
                } else if (location.pathname === '/games_catalog') {
                    return 'Каталог игр';
                } else if (location.pathname.includes('/game/')) {
                    return 'Игра';
                } else if (location.pathname.includes('/level/')) {
                    return 'Уровень';
                } else if (location.pathname.startsWith('/profile')) {
                    return 'Профиль';
                }
                return '';
            })()}
        </Typography>
    );
};

PageTitle.propTypes = {
    location: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(PageTitle));
