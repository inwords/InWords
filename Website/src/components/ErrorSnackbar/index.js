import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import errorMessageActions from '../../actions/errorMessageActions';
import ErrorSnackbar from './ErrorSnackbar';

function ErrorSnackbarContainer({ errorMessage, resetErrorMessage }) {
    const handleClose = () => {
        resetErrorMessage();
    };

    return (
        <ErrorSnackbar
            open={Boolean(errorMessage)}
            errorMessage={errorMessage ? errorMessage : ''}
            handleClose={handleClose}
        />
    );
}

ErrorSnackbarContainer.propTypes = {
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
};

const mapStateToProps = store => {
    return {
        errorMessage: store.errorMessage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetErrorMessage: () => dispatch(errorMessageActions.resetErrorMessage())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorSnackbarContainer);
