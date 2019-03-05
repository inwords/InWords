import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
                {errorMessage ?
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div> :
                    <div />}
                {children}
            </div>
        );
    }
}

WrapperWithErrorHandling.propTypes = {
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired
}
