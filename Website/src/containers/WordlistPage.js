import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WordlistActions } from '../actions/WordlistActions';
import PropTypes from 'prop-types';
import WordlistTools from '../components/WordlistTools';
import WordPair from './WordPair';

class WordlistPage extends Component {
    static propTypes = {
        wordPairs: PropTypes.array.isRequired,
        searchPattern: PropTypes.string.isRequired,
        pullWordPairs: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.pullWordPairs();
    }

    render() {
        const { wordPairs, searchPattern } = this.props;

        let wordPairsRevercedCopy = wordPairs.slice().reverse();

        if (searchPattern) {
            wordPairsRevercedCopy = wordPairsRevercedCopy.filter((wordPair) =>
                wordPair.wordForeign.toUpperCase().includes(searchPattern.toUpperCase()) ||
                wordPair.wordNative.toUpperCase().includes(searchPattern.toUpperCase())
            );
        }

        return (
            <Fragment>
                <WordlistTools />
                <ul className="list-group list-group-flush">
                    {wordPairsRevercedCopy.map((wordPair) =>
                        <WordPair
                            key={wordPair.serverId}
                            wordPair={wordPair}
                        />)}
                </ul>
            </Fragment>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        wordPairs: store.wordlist.wordPairs,
        searchPattern: store.wordlist.searchPattern
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pullWordPairs: () => dispatch(WordlistActions.pullWordPairs())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordlistPage);
