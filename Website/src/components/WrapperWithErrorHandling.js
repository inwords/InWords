import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prepareErrorAlert } from '../helpers/prepareErrorAlert';

export class WrapperWithErrorHandling extends Component {
    componentDidMount() {
        const { errorMessage, resetErrorMessage } = this.props;

        if (errorMessage) {
            resetErrorMessage();
        }
    }

    render() {
        const { errorMessage, children } = this.props;

        return (
            <div className="container">
                {prepareErrorAlert(errorMessage)}
                {children}
            </div>
        );
    }
}

WrapperWithErrorHandling.propTypes = {
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired
}
