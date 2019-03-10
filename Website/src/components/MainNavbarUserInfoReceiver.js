import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class MainNavbarUserInfoReceiver extends Component {
    componentDidMount() {
        if (this.props.accessToken) {
            this.props.receiveUserInfo();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.accessToken !== prevProps.accessToken && this.props.accessToken) {
            this.props.receiveUserInfo();
        }
    }

    render() {
        return (
            <Fragment />
        );
    }
}

MainNavbarUserInfoReceiver.propTypes = {
    accessToken: PropTypes.string,
    receiveUserInfo: PropTypes.func.isRequired
};

export default MainNavbarUserInfoReceiver;
