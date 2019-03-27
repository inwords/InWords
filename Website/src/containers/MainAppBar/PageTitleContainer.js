import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageTitle from '../../components/MainAppBar/PageTitle';

function PageTitleContainer({ location }) {
    let title = (() => {
        switch (location.pathname) {
            case '/login':
                return 'Вход';
            case '/register':
                return 'Регистрация';
            case '/wordlist':
                return 'Словарь';
            case '/game':
                return 'Игра';
            case '/profile':
                return 'Профиль';
            case '/settings':
                return 'Настройки';
            default:
                return '';
        }
    })();

    return <PageTitle title={title} />;
}

PageTitleContainer.propTypes = {
    location: PropTypes.object.isRequired
};

export default withRouter(PageTitleContainer);
