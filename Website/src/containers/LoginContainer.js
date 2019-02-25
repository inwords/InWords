import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { UserActions } from '../actions/UserActions';
import { Login } from '../components/Login';

class LoginContainer extends Component {
    render() {
        const { auth, loginAction } = this.props;
        return (
            <Container>
                <Login error={auth.error} login={loginAction} />
            </Container>
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
