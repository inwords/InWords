import React from 'react';
import PropTypes from 'prop-types';

function Login({ email, password, handleSubmit, handleChange }) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="inputEmail">Электронная почта</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="Введите email" required="required"
                    value={email} onChange={handleChange("email")} />
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword">Пароль</label>
                <input type="password" className="form-control" id="inputPassword" placeholder="Введите пароль" required="required"
                    value={password} onChange={handleChange("password")} />
            </div>
            <button type="submit" className="btn btn-primary">Войти</button>
        </form>
    );
}

Login.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default Login;
