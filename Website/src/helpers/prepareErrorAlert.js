import React from 'react';

export function prepareErrorAlert(error) {
    return error.constructor === Error ?
        <div className="alert alert-danger" role="alert">{error.message}</div> :
        <div />;
};
