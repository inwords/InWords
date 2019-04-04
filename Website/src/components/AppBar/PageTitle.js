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
        <Typography variant="h6" color="inherit" className={classes.grow}>
            {(() => {
                switch (location.pathname) {
                    case '/login':
                        return 'Вход';
                    case '/register':
                        return 'Регистрация';
                    case '/wordlist':
                        return 'Словарь';
                    case '/games':
                        return 'Игры';
                    case '/profile':
                        return 'Профиль';
                    case '/settings':
                        return 'Настройки';
                    default:
                        return '';
                }
            })()}
        </Typography>
    );
};

PageTitle.propTypes = {
    location: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(PageTitle));
