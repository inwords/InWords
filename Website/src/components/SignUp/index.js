import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import StringifyFormDataUtil from '../Utils/StringifyFormDataUtil'

const API = 'http://chatqq.ru/api/auth/registration';

class SignUp extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            requestFailed: false
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: StringifyFormDataUtil.stringifyFormData(data)
        })
            .then(response => {
                if (response.ok) {
                    this.setState({ requestFailed: false });
                } else {
                    this.setState({ requestFailed: true });
                }
            })
            .catch(error => {
                this.setState({ requestFailed: true });
                console.error(error);
            });
    }

    render() {
        const { requestFailed } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    {requestFailed ?
                        <div className="alert alert-danger" role="alert">Ошибка!</div> :
                        <div />}
                    <div className="form-group">
                        <input name="Email" type="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input name="Password" type="password" className="form-control" placeholder="Password" />
                    </div>
                    <button className="btn btn-primary">Зарегистрироваться</button>
                </div>
            </form>
        )
    }
}

export default SignUp