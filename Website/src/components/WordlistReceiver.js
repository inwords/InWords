import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prepareErrorAlert } from '../helpers/prepareErrorAlert';

export class WordlistReceiver extends Component {
    componentDidMount() {
        this.props.pullWordPairs(this.props.token);
    }

    componentDidUpdate(prevProps) {
        if (this.props.relevant !== prevProps.relevant && !this.props.relevant) {
            this.props.pullWordPairs(this.props.token);
        }
    }

    render() {
        return (
            <div>
                {prepareErrorAlert(this.props.error)}
            </div>
        );
    }
}

WordlistReceiver.propTypes = {
    token: PropTypes.string.isRequired,
    relevant: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    pullWordPairs: PropTypes.func.isRequired
}
