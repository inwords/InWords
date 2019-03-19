import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function MainNavbar({ accessToken, avatarPath, isFetching, handleLogout }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3 sticky-top">
            {accessToken && avatarPath ?
                <a className="navbar-brand" href="/#">
                    <img className="rounded-circle" src={avatarPath} width="30" height="30" alt="&#128565;" />
                </a> :
                null}
            <a className="navbar-brand" href="/#">InWords</a>
            <div className={"spinner-border spinner-border-sm text-secondary" + (isFetching ? "" : " invisible")} role="status" />
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    {!accessToken ?
                        <Fragment>
                            <li className="nav-item">
                                <a className="nav-link" href="#/login">Авторизация</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/register">Регистрация</a>
                            </li>
                        </Fragment> :
                        <Fragment>
                            <li className="nav-item">
                                <a className="nav-link" href="#/wordlist">Словарь</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/game">Игра</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/account">Аккаунт</a>
                            </li>
                        </Fragment>}
                </ul>
                {accessToken ?
                    <button type="button" className="btn btn-outline-secondary" onClick={handleLogout}>Выйти</button> :
                    null}
            </div>
        </nav >
    );
};

MainNavbar.propTypes = {
    accessToken: PropTypes.string,
    avatarPath: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired
};

export default MainNavbar;
