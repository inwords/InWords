import React from 'react';
import PropTypes from 'prop-types';

function WrapperWithErrorAlert({ errorMessage, children }) {
    return (
        <div className="container">
            {errorMessage ?
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div> :
                null}
            {children}
        </div>
    );
}

WrapperWithErrorAlert.propTypes = {
    errorMessage: PropTypes.string
};

export default WrapperWithErrorAlert;
