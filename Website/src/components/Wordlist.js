import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Wordlist extends Component {
    componentDidMount() {
        const { accessToken, pullWordPairs } = this.props;
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
    pullWordPairs: PropTypes.func.isRequired
}
