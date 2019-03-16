import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ErrorMessageActions } from '../actions/ErrorMessageActions';

class WrapperWithErrorAlert extends Component {
    static propTypes = {
        errorMessage: PropTypes.string,
        resetErrorMessage: PropTypes.func.isRequired
    };

    timerId = null;

    componentDidUpdate(prevProps) {
        if (this.props.errorMessage !== prevProps.errorMessage) {
            if (this.props.errorMessage) {
                if (this.timerId) {
                    clearTimeout(this.timerId);
                }

                this.timerId = setTimeout(() => {
                    this.props.resetErrorMessage();
                }, 2000);
            }
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
)(WrapperWithErrorAlert);
