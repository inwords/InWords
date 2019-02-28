import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prepareErrorAlert } from '../helpers/prepareErrorAlert';

export class Wordlist extends Component {
    render() {
        const SmartWordPair = this.props.smartWordPair;
        const wordPairs = this.props.pairs.map((pair, index) =>
            <SmartWordPair key={index} id={pair.serverId}
                wordForeign={pair.wordForeign} wordNative={pair.wordNative} />);
        return (
            <div>
                <ul className="list-group list-group-flush">
                    {prepareErrorAlert(this.props.error)}
                    {wordPairs}
                </ul>
            </div>
        );
    }
}

Wordlist.propTypes = {
    pairs: PropTypes.array.isRequired,
    error: PropTypes.object.isRequired
}
