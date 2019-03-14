import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import WordlistTools from './WordlistTools';

class Wordlist extends Component {
    componentDidMount() {
        this.props.pullWordPairs();
    }

    render() {
        const { wordPairs, searchPattern, addWordPair, findWordPairs } = this.props;
        const SmartWordPair = this.props.smartWordPair;

        let wordPairsRevercedCopy = wordPairs.slice().reverse();

        if (searchPattern) {
            wordPairsRevercedCopy = wordPairsRevercedCopy.filter((wordPair) =>
                wordPair.wordForeign.includes(searchPattern) || wordPair.wordNative.includes(searchPattern)
            );
        }

        return (
            <Fragment>
                <WordlistTools
                    addWordPair={addWordPair}
                    findWordPairs={findWordPairs}
                />
                <ul className="list-group list-group-flush">
                    {wordPairsRevercedCopy.map((wordPair) =>
                        <SmartWordPair
                            key={wordPair.serverId}
                            wordPair={wordPair}
                        />)}
                </ul>
            </Fragment>
        );
    }
}

Wordlist.propTypes = {
    smartWordPair: PropTypes.func.isRequired,
    wordPairs: PropTypes.array.isRequired,
    searchPattern: PropTypes.string.isRequired,
    pullWordPairs: PropTypes.func.isRequired,
    addWordPair: PropTypes.func.isRequired,
    findWordPairs: PropTypes.func.isRequired
};

export default Wordlist;
