import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../actions/UserActions';

class RegisterPage extends Component {
    static propTypes = {
        redirect: PropTypes.bool.isRequired,
        register: PropTypes.func.isRequired
    };

    state = {
        email: '',
        password: ''
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
        this.props.register({
            Email: this.state.email,
            Password: this.state.password
        });
        
        event.preventDefault();
    };

    render() {
        const { redirect } = this.props;
        const { email, password } = this.state;

        if (redirect) {
            return <Redirect to="/login" />;
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputEmail">Электронная почта</label>
                    <input type="email" className="form-control" id="inputEmail" placeholder="Введите email" required="required" value={email} onChange={this.handleChangeEmail} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Пароль</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Введите пароль" required="required" value={password} onChange={this.handleChangePassword} />
                </div>
                <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
            </form>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        redirect: store.user.register.redirect
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (userdata) => dispatch(UserActions.register(userdata))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage);
