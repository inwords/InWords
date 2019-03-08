import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WordlistActions } from '../actions/WordlistActions';
import { ErrorActions } from '../actions/ErrorActions';
import WrapperWithErrorHandling from '../components/WrapperWithErrorHandling';
import WordlistTools from '../components/WordlistTools';
import Wordlist from '../components/Wordlist';
import WordPair from '../components/WordPair';

class WordlistContainer extends Component {
    render() {
        const {
            wordPairs,
            pullWordPairsAction,
            deleteWordPairAction,
            addWordPairAction,
            editWordPairAction,
            errorMessage,
            resetErrorMessageAction } = this.props;

        const SmartWordPair = ({ wordPair }) =>
            <WordPair
                wordPair={wordPair}
                deleteWordPair={deleteWordPairAction}
                editWordPair={editWordPairAction} />;

        return (
            <WrapperWithErrorHandling
                errorMessage={errorMessage}
                resetErrorMessage={resetErrorMessageAction}>

                <WordlistTools
                    addWordPair={addWordPairAction} />

                <Wordlist
                    smartWordPair={SmartWordPair}
                    wordPairs={wordPairs}
                    pullWordPairs={pullWordPairsAction} />

            </WrapperWithErrorHandling>
        );
    }
}

const mapStateToProps = store => {
    return {
        wordPairs: store.wordlist.wordPairs,
        errorMessage: store.errorMessage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        pullWordPairsAction: () => dispatch(WordlistActions.pullWordPairs()),
        deleteWordPairAction: (pairId) => dispatch(WordlistActions.deleteWordPair(pairId)),
        addWordPairAction: (wordPair) => dispatch(WordlistActions.addWordPair(wordPair)),
        editWordPairAction: (pairId, wordPair) =>
            dispatch(WordlistActions.editWordPair(pairId, wordPair)),
        resetErrorMessageAction: () => dispatch(ErrorActions.resetErrorMessage())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordlistContainer);
