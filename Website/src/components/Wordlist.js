import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Wordlist extends Component {
    componentDidMount() {
        this.props.pullWordPairs();
    }

    render() {
        const SmartWordPair = this.props.smartWordPair;

        return (
            <ul className="list-group list-group-flush">
                {this.props.wordPairs.slice().reverse().map((pair) =>
                    <SmartWordPair
                        key={pair.serverId}
                        wordPair={pair} />)}
            </ul>
        );
    }
}

Wordlist.propTypes = {
    smartWordPair: PropTypes.func.isRequired,
    wordPairs: PropTypes.array.isRequired,
    pullWordPairs: PropTypes.func.isRequired
};

export default Wordlist;
