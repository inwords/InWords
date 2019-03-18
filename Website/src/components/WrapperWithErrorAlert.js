import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function WrapperWithErrorAlert({ errorMessage, children }) {
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

WrapperWithErrorAlert.propTypes = {
    errorMessage: PropTypes.string
};

export default WrapperWithErrorAlert;
