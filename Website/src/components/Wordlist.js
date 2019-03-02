import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prepareErrorAlert } from '../helpers/prepareErrorAlert';

export class Wordlist extends Component {
    componentDidMount() {
        const { accessToken, pullWordPairs, errorMessage, resetErrorMessage } = this.props;

        if (errorMessage) {
            resetErrorMessage()
        }

        pullWordPairs(accessToken);
    }

    render() {
        const SmartWordPair = this.props.smartWordPair;

        const wordPairs = this.props.wordPairs.map((pair, index) =>
            <SmartWordPair key={index} id={pair.serverId}
                wordForeign={pair.wordForeign} wordNative={pair.wordNative} />);

        return (
            <div>
                <ul className="list-group list-group-flush">
                    {prepareErrorAlert(this.props.errorMessage)}
                    {wordPairs}
                </ul>
            </div>
        );
    }
}

Wordlist.propTypes = {
    smartWordPair: PropTypes.func.isRequired,
    accessToken: PropTypes.string,
    wordPairs: PropTypes.array.isRequired,
    pullWordPairs: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired
}
