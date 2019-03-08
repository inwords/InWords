import React, { Component, Fragment } from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class TopNavbar extends Component {
    handleClickLogout = () => {
        this.props.logout();
    };

    render() {
        const { accessToken, fetching, avatarPath, location } = this.props;

        const loginLink =
            <NavLink className="nav-link" activeClassName="selected" to="/login">
                Авторизация
            </NavLink>;

        const registerLink =
            <NavLink className="nav-link" activeClassName="selected" to="/register">
                Регистрация
            </NavLink>;

        const wordlistLink =
            <NavLink className="nav-link" activeClassName="selected" to="/wordlist">
                Словарь
            </NavLink>;

        const learningLink =
            <NavLink className="nav-link" activeClassName="selected" to="/learning">
                Изучение
            </NavLink>;

        const accountLink =
            <NavLink className="nav-link" activeClassName="selected" to="/user-info">
                Аккаунт
            </NavLink>;

        const logoutButton =
            <button type="button" className="btn btn-outline-secondary" onClick={this.handleClickLogout}>
                Выйти
            </button>;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3 sticky-top">
                {!accessToken && location.pathname !== "/login" ? <Redirect to="/login" /> :
                    accessToken && location.pathname === "/" ? <Redirect to="/wordlist" /> :
                        <Fragment />}
                {accessToken && avatarPath ?
                    <a className="navbar-brand" href=".">
                        <img className="rounded-circle" src={avatarPath} width="30" height="30" alt="&#128565;" />
                    </a> :
                    <Fragment />}
                <a className="navbar-brand" href=".">
                    InWords
                </a>
                {fetching ?
                    <div className="spinner-border spinner-border-sm text-secondary" role="status" /> :
                    <div className="spinner-border spinner-border-sm text-secondary invisible" role="status" />}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        {!accessToken ? loginLink : <Fragment />}
                        {!accessToken ? registerLink : <Fragment />}
                        {accessToken ? wordlistLink : <Fragment />}
                        {accessToken ? learningLink : <Fragment />}
                        {accessToken ? accountLink : <Fragment />}
                    </ul>
                    {accessToken ? logoutButton : <Fragment />}
                </div>
            </nav>
        );
    }
}

TopNavbar.propTypes = {
    accessToken: PropTypes.string,
    avatarPath: PropTypes.string,
    fetching: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

export default withRouter(TopNavbar);
