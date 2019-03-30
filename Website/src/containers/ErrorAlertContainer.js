import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { errorMessageActions } from '../actions/errorMessageActions';
import ErrorAlert from '../components/ErrorAlert';

function ErrorAlertContainer(props) {
    const { resetErrorMessage, ...rest } = props;

    const handleClose = () => {
        resetErrorMessage();
    };

    return (
        <ErrorAlert
            {...rest}
            handleClose={handleClose}
        />
    );
}

ErrorAlertContainer.propTypes = {
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired
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
)(ErrorAlertContainer);
