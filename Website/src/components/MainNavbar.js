import React, { Component, Fragment } from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class MainNavbar extends Component {
    handleClickLogout = () => {
        this.props.logout();
    };

    render() {
        const { accessToken, avatarPath, isFetching, location } = this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3 sticky-top">
                {!accessToken && location.pathname !== "/login" ? <Redirect to="/login" /> :
                    accessToken && location.pathname === "/" ? <Redirect to="/wordlist" /> :
                        <Fragment />
                }
                {accessToken && avatarPath ?
                    <a className="navbar-brand" href=".">
                        <img className="rounded-circle" src={avatarPath} width="30" height="30" alt="&#128565;" />
                    </a> :
                    <Fragment />
                }
                <a className="navbar-brand" href=".">
                    InWords
                </a>
                {isFetching ?
                    <div className="spinner-border spinner-border-sm text-secondary" role="status" /> :
                    <div className="spinner-border spinner-border-sm text-secondary invisible" role="status" />
                }
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        {!accessToken ?
                            <Fragment>
                                <NavLink className="nav-link" activeClassName="selected" to="/login">
                                    Авторизация
                                </NavLink>
                                <NavLink className="nav-link" activeClassName="selected" to="/register">
                                    Регистрация
                                </NavLink>
                            </Fragment> :
                            <Fragment />
                        }
                        {accessToken ?
                            <Fragment>
                                <NavLink className="nav-link" activeClassName="selected" to="/wordlist">
                                    Словарь
                                </NavLink>
                                < NavLink className="nav-link" activeClassName="selected" to="/game">
                                    Игра
                                </NavLink>
                                <NavLink className="nav-link" activeClassName="selected" to="/user_info">
                                    Аккаунт
                                </NavLink>
                            </Fragment> :
                            <Fragment />
                        }
                    </ul>
                    {accessToken ?
                        <button type="button" className="btn btn-outline-secondary" onClick={this.handleClickLogout}>
                            Выйти
                        </button> :
                        <Fragment />
                    }
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
