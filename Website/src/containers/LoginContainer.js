import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../actions/UserActions';
import { Login } from '../components/Login';

class LoginContainer extends Component {
    render() {
        const { auth, loginAction } = this.props;
        return (
            <div className="container">
                <Login redirect={auth.redirect} error={auth.error}
                    login={loginAction} />
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loginAction: userdata => dispatch(UserActions.login(userdata))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
