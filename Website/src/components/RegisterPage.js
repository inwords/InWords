import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { stringifyFormData } from '../helpers/stringifyFormData';
import { prepareErrorAlert } from '../helpers/prepareErrorAlert';

export class RegisterPage extends Component {
    componentDidMount() {
        const { errorMessage, resetErrorMessage } = this.props;

        if (errorMessage) {
            resetErrorMessage()
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.register(stringifyFormData(new FormData(event.target)));
    }

    render() {
        const { redirect, errorMessage } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                {redirect ? <Redirect to="/login" /> : <div />}
                {prepareErrorAlert(errorMessage)}
                <div className="form-group">
                    <label htmlFor="inputEmail">
                        Email
                    </label>
                    <input type="email" id="inputEmail" className="form-control"
                        placeholder="Введите email" name="Email" required="required" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">
                        Пароль
                    </label>
                    <input type="password" id="inputPassword" className="form-control"
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
    register: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired
}
