import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class MainNavbar extends Component {
    handleClickLogout = () => {
        this.props.logout();
    };

    render() {
        const { accessToken, avatarPath, isFetching } = this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3 sticky-top">
                {accessToken && avatarPath ?
                    <a className="navbar-brand" href=".">
                        <img className="rounded-circle" src={avatarPath} width="30" height="30" alt="&#128565;" />
                    </a> :
                    <Fragment />}
                <a className="navbar-brand" href=".">
                    InWords
                </a>
                <div className={isFetching ?
                    "spinner-border spinner-border-sm text-secondary" :
                    "spinner-border spinner-border-sm text-secondary invisible"} role="status" />
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
                                    <a className="nav-link" href="#/user_info">Аккаунт</a>
                                </li>
                            </Fragment>}
                    </ul>
                    {accessToken ?
                        <button type="button" className="btn btn-outline-secondary" onClick={this.handleClickLogout}>
                            Выйти
                        </button> :
                        <Fragment />}
                </div>
            </nav >
        );
    }
}

MainNavbar.propTypes = {
    accessToken: PropTypes.string,
    avatarPath: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

export default withRouter(MainNavbar);
