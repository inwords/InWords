import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../../actions/WordlistActions';
import WordlistToolsWrapper from '../../components/Wordlist/WordlistToolsWrapper';
import WordPairWrapper from '../../components/Wordlist/WordPairWrapper';
import WordlistWrapper from '../../components/Wordlist/WordlistWrapper';
import Wordlist from '../../components/Wordlist/Wordlist';
import WordlistToolsContainer from './WordlistToolsContainer';
import WordPairContainer from './WordPairContainer';

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

        let wordPairsRevercedCopy = [...wordPairs].reverse();

        if (searchPattern) {
            wordPairsRevercedCopy = wordPairsRevercedCopy.filter((wordPair) =>
                wordPair.wordForeign.toUpperCase().includes(searchPattern.toUpperCase()) ||
                wordPair.wordNative.toUpperCase().includes(searchPattern.toUpperCase())
            );
        }

        return (
            <Fragment>
                <WordlistToolsWrapper>
                    <WordlistToolsContainer />
                </WordlistToolsWrapper>
                <WordlistWrapper>
                    {wordPairsRevercedCopy.map((wordPair) =>
                        <WordPairWrapper key={wordPair.serverId}>
                            <WordPairContainer wordPair={wordPair} />
                        </WordPairWrapper>)}
                </WordlistWrapper>
                {false && <Wordlist wordPairs={wordPairsRevercedCopy} />}
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
