import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

class TopNavbar extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="signin">InWords</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="signin">Авторизация</Nav.Link>
                        <Nav.Link href="signup">Регистрация</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default TopNavbar