import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { UserActions } from '../actions/UserActions';
import { Register } from '../components/Register';

class RegisterContainer extends Component {
    render() {
        const { register, registerAction } = this.props;
        return (
            <Container>
                <Register redirect={register.redirect} error={register.error} register={registerAction} />
            </Container>
        );
    }
}

const mapStateToProps = store => {
    return {
        register: store.register
    };
}

const mapDispatchToProps = dispatch => {
    return {
        registerAction: userdata => dispatch(UserActions.register(userdata))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterContainer);
