import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export class TopNavbar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <NavLink className="navbar-brand" to="/">InWords</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink className="nav-link" to="/signin">Авторизация</NavLink>
                        <NavLink className="nav-link" to="/signup">Регистрация</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
