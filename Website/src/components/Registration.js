import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { stringifyFormData } from '../helpers/stringifyFormData';

export class Registration extends Component {
    handleSubmit = event => {
        event.preventDefault();
        this.props.register(stringifyFormData(new FormData(event.target)));
    }

    render() {
        const { error } = this.props;
        const errorMessage = error ?
            <div className="alert alert-danger" role="alert">
                {error}
            </div> :
            <div />
        return (
            <Form onSubmit={this.handleSubmit}>
                {errorMessage}
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Введите email" name="Email" required="required" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Введите пароль" name="Password" required="required" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Зарегистрироваться
                </Button>
            </Form>
        )
    }
}

Registration.propTypes = {
    error: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired
}
