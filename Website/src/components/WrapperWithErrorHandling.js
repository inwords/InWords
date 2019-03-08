import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class WrapperWithErrorHandling extends Component {
    componentDidMount() {
        if (this.props.errorMessage) {
            this.props.resetErrorMessage();
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
                    <Fragment />}
                {children}
            </div>
        );
    }
}

WrapperWithErrorHandling.propTypes = {
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired
};

export default WrapperWithErrorHandling;
