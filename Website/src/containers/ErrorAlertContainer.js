import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ErrorMessageActions } from '../actions/ErrorMessageActions';
import ErrorAlert from '../components/ErrorAlert';

class ErrorAlertContainer extends Component {
    static propTypes = {
        errorMessage: PropTypes.string,
        resetErrorMessage: PropTypes.func.isRequired
    };

    static defaultProps = {
        errorMessage: null
    };

    handleClose = () => {
        this.props.resetErrorMessage();
    };

    render() {
        return (
            <ErrorAlert
                {...this.props}
                handleClose={this.handleClose}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        errorMessage: store.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetErrorMessage: () => dispatch(ErrorMessageActions.resetErrorMessage())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorAlertContainer);
