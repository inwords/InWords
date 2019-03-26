import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../actions/UserActions';
import Register from '../components/Register';

class RegisterPage extends Component {
    static propTypes = {
        redirect: PropTypes.bool.isRequired,
        register: PropTypes.func.isRequired
    };

    handleSubmit = userdata => event => {
        this.props.register(userdata);
        event.preventDefault();
    };

    render() {
        const { redirect } = this.props;

        if (redirect) {
            return <Redirect to="/login" />;
        }

        return <Register handleSubmit={this.handleSubmit} />;
    }
}

const mapStateToProps = store => {
    return {
        redirect: store.user.register.redirect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        register: userdata => dispatch(UserActions.register(userdata))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage);
