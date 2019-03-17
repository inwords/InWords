import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../actions/UserActions';

class LoginPage extends Component {
    static propTypes = {
        redirect: PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired
    };

    state = {
        email: "",
        password: ""
    };

    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    handleSubmit = (event) => {
        this.props.login({
            Email: this.state.email,
            Password: this.state.password
        });

        event.preventDefault();
    };

    render() {
        const { redirect } = this.props;
        const { email, password } = this.state;

        if (redirect) {
            return <Redirect to="/wordlist" />;
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputEmail">Электронная почта</label>
                    <input type="email" className="form-control" id="inputEmail" placeholder="Введите email" required="required"
                        value={email} onChange={this.handleChangeEmail} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Пароль</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Введите пароль" required="required"
                        value={password} onChange={this.handleChangePassword} />
                </div>
                <button type="submit" className="btn btn-primary">Войти</button>
            </form>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        redirect: store.user.login.redirect
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (userdata) => dispatch(UserActions.login(userdata))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
