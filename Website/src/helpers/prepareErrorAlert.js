import React from 'react';

export function prepareErrorAlert(errorMessage) {
    return errorMessage ?
        <div className="alert alert-danger" role="alert">{errorMessage}</div> :
        <div />;
};
