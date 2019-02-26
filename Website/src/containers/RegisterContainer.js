import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../actions/UserActions';
import { Register } from '../components/Register';

class RegisterContainer extends Component {
    render() {
        const { register, registerAction } = this.props;
        return (
            <div className="container">
                <Register redirect={register.redirect} error={register.error}
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
