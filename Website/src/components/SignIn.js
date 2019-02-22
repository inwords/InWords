import React from 'react'

import { API_HOST } from '../config'
import { stringifyFormData } from '../helpers/stringifyFormData.js'

class SignIn extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            requestFailed: false,
            message: ''
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch(API_HOST + '/api/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Version': '2.0'
            },
            body: stringifyFormData(data)
        })
            .then(response => {
                if (response.ok) {
                    this.setState({ requestFailed: false });
                } else {
                    this.setState({ requestFailed: true });
                }
                return response.text();
            })
            .then(text => {
                this.setState({ message: text });
            })
            .catch(error => {
                this.setState({ requestFailed: true });
                console.error(error.message);
            });
    }

    render() {
        const { requestFailed, message } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                {requestFailed ?
                    <div className="alert alert-danger" role="alert">
                        Ошибка: {message}
                    </div> :
                    <div />}
                <div className="form-group">
                    <input className="form-control" type="email" name="Email" placeholder="Email" required="required" />
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="Password" placeholder="Password" required="required" />
                </div>
                <button className="btn btn-primary">Войти</button>
            </form>
        )
    }
}

export default SignIn