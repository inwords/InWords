import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WordlistActions } from '../actions/WordlistActions';
import { WordlistTools } from '../components/WordlistTools';
import { WordlistReceiver } from '../components/WordlistReceiver';
import { Wordlist } from '../components/Wordlist';
import { WordPair } from '../components/WordPair';

class WordlistContainer extends Component {
    render() {
        const { credentials, pullWordPairs, delWordPairs, wordPairsRelevance,
            pullWordPairsAction, delWordPairsAction } = this.props;

        const SmartWordPair = ({ id, wordForeign, wordNative }) =>
            <WordPair id={id} wordForeign={wordForeign} wordNative={wordNative}
                token={credentials.token} error={delWordPairs.error} deleteWordPairs={delWordPairsAction} />;
                
        return (
            <div className="container">
                <WordlistTools />
                <WordlistReceiver token={credentials.token} relevant={wordPairsRelevance.relevant}
                    error={pullWordPairs.error} pullWordPairs={pullWordPairsAction} />
                <Wordlist smartWordPair={SmartWordPair} pairs={pullWordPairs.pairs} error={delWordPairs.error} />
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        credentials: store.credentials,
        pullWordPairs: store.pullWordPairs,
        delWordPairs: store.delWordPairs,
        wordPairsRelevance: store.wordPairsRelevance
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullWordPairsAction: (token) => dispatch(WordlistActions.pullWordPairs(token)),
        delWordPairsAction: (token, pairsIds) => dispatch(WordlistActions.deleteWordPairs(token, pairsIds))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordlistContainer);
