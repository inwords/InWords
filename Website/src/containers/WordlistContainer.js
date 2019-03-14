import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WordlistActions } from '../actions/WordlistActions';
import { ErrorMessageActions } from '../actions/ErrorMessageActions';
import Wordlist from '../components/Wordlist';
import WordPair from '../components/WordPair';

class WordlistContainer extends Component {
    render() {
        const {
            wordPairs,
            searchPattern,
            pullWordPairsAction,
            deleteWordPairAction,
            addWordPairAction,
            editWordPairAction,
            findWordPairsAction
        } = this.props;

        function SmartWordPair({ wordPair }) {
            return <WordPair
                wordPair={wordPair}
                deleteWordPair={deleteWordPairAction}
                editWordPair={editWordPairAction}
            />;
        }

        return (
            <Wordlist
                smartWordPair={SmartWordPair}
                wordPairs={wordPairs}
                searchPattern={searchPattern}
                pullWordPairs={pullWordPairsAction}
                addWordPair={addWordPairAction}
                findWordPairs={findWordPairsAction}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        wordPairs: store.wordlist.wordPairs,
        searchPattern: store.wordlist.searchPattern,
        errorMessage: store.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pullWordPairsAction: () => dispatch(WordlistActions.pullWordPairs()),
        deleteWordPairAction: (pairId) => dispatch(WordlistActions.deleteWordPair(pairId)),
        addWordPairAction: (wordPair) => dispatch(WordlistActions.addWordPair(wordPair)),
        editWordPairAction: (pairId, wordPair) => dispatch(WordlistActions.editWordPair(pairId, wordPair)),
        findWordPairsAction: (pattern) => dispatch(WordlistActions.findWordPairs(pattern)),
        resetErrorMessageAction: () => dispatch(ErrorMessageActions.resetErrorMessage())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordlistContainer);
