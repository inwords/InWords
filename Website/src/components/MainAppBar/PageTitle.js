import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    grow: {
        flexGrow: 1,
    },
};

function PageTitle({ location, classes }) {
    return (
        <Typography variant="h6" color="inherit" className={classes.grow}>
            {location.pathname === '/login' ? 'Вход' :
                location.pathname === '/register' ? 'Регистрация' :
                    location.pathname === '/wordlist' ? 'Словарь' :
                        location.pathname === '/game' ? 'Игра' :
                            location.pathname === '/account' ? 'Профиль' : ''}
        </Typography>
    );
};

PageTitle.propTypes = {
    location: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PageTitle);
