import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class MainUserInfoReceiver extends Component {
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

MainUserInfoReceiver.propTypes = {
    accessToken: PropTypes.string,
    receiveUserInfo: PropTypes.func.isRequired
};

export default MainUserInfoReceiver;
