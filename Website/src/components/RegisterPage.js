import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { stringifyFormData } from '../helpers/stringifyFormData';
import { prepareErrorAlert } from '../helpers/prepareErrorAlert';

export class RegisterPage extends Component {
    handleSubmit = event => {
        event.preventDefault();
        this.props.register(stringifyFormData(new FormData(event.target)));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.props.redirect ? <Redirect to="/login" /> : <div />}
                {prepareErrorAlert(this.props.error)}
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control"
                        placeholder="Введите email" name="Email" required="required" />
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <input type="password" className="form-control"
                        placeholder="Введите пароль" name="Password" required="required" />
                </div>
                <button type="submit" className="btn btn-primary">
                    Зарегистрироваться
            </button>
            </form>
        );
    }
}

RegisterPage.propTypes = {
    redirect: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
}
