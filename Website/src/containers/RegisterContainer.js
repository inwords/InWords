import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../actions/UserActions';
import { RegisterPage } from '../components/RegisterPage';

class RegisterContainer extends Component {
    render() {
        const { register, registerAction } = this.props;
        return (
            <div className="container">
                <RegisterPage redirect={register.redirect} error={register.error}
                    register={registerAction} />
            </div>
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
