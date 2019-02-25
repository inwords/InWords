import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class TopNavbar extends Component {
    handleClick = () => {
        this.props.logout();
    }

    render() {
        const { token } = this.props;
        const exitButton = token ?
            <Button variant="outline-light" onClick={this.handleClick}>Выйти</Button> :
            <div />;
        const authLink = token ?
            <div /> :
            <NavLink className="nav-link" activeClassName="selected" to="/login">Авторизация</NavLink>;
        const registerLink = token ?
            <div /> :
            <NavLink className="nav-link" activeClassName="selected" to="/register">Регистрация</NavLink>
        const wordlistLink = token ?
            <NavLink className="nav-link" activeClassName="selected" to="/wordlist">Словарь</NavLink> :
            <div />;
        console.log(token);
        return (
            <Navbar bg="primary" variant="dark" expand="lg">
                <NavLink className="navbar-brand" to="/">InWords</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {authLink}
                        {registerLink}
                        {wordlistLink}
                    </Nav>
                    {exitButton}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

TopNavbar.propTypes = {
    token: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
}
