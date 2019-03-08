import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class RegisterPage extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        
        this.props.register(new FormData(event.target));
    };

    render() {
        const { redirect } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                {redirect ? <Redirect to="/login" /> : <Fragment />}
                <div className="form-group">
                    <label htmlFor="inputEmail">
                        Email
                    </label>
                    <input type="email" className="form-control" id="inputEmail"
                        placeholder="Введите email" name="Email" required="required" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">
                        Пароль
                    </label>
                    <input type="password" className="form-control" id="inputPassword"
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
    register: PropTypes.func.isRequired
};

export default RegisterPage;
