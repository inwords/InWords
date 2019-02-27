import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class TopNavbar extends Component {
    handleLogout = () => {
        this.props.logout();
    }

    render() {
        const { token } = this.props;
        const redirection = token ? <div /> : <Redirect to="/login" />;
        const loginLink = token ?
            <div /> :
            <NavLink className="nav-link" activeClassName="selected" to="/login">Авторизация</NavLink>;
        const registerLink = token ?
            <div /> :
            <NavLink className="nav-link" activeClassName="selected" to="/register">Регистрация</NavLink>
        const wordlistLink = token ?
            <NavLink className="nav-link" activeClassName="selected" to="/wordlist">Словарь</NavLink> :
            <div />;
        const logoutButton = token ?
            <button type="button" className="btn btn-outline-light" onClick={this.handleLogout}>
                Выход
            </button> :
            <div />;
        return (
            <Navbar expand="lg" bg="primary" variant="dark">
                {redirection}
                <NavLink className="navbar-brand" to="/">InWords</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <ul className="navbar-nav mr-auto">
                        {loginLink}
                        {registerLink}
                        {wordlistLink}
                    </ul>
                    {logoutButton}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

TopNavbar.propTypes = {
    token: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
}
