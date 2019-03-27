import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../../actions/WordlistActions';
import Wordlist from '../../components/Wordlist/Wordlist';

class WordlistPage extends Component {
    static propTypes = {
        wordPairs: PropTypes.array.isRequired,
        searchPattern: PropTypes.string.isRequired,
        pullWordPairs: PropTypes.func.isRequired,
    };

    state = {
        checked: []
    };

    componentDidMount() {
        this.props.pullWordPairs();
    }

    componentDidUpdate(prevProps) {
        const { wordPairs } = this.props;

        if (wordPairs.length < prevProps.wordPairs.length) {
            this.setState({
                checked: []
            });
        }
    }

    handleToggle = value => () => {
        const currentIndex = this.state.checked.indexOf(value);
        const newChecked = [...this.state.checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
    };

    render() {
        const { wordPairs, searchPattern } = this.props;
        const { checked } = this.state;

        let wordPairsRevercedCopy = [...wordPairs].reverse();

        if (searchPattern) {
            wordPairsRevercedCopy = wordPairsRevercedCopy.filter((wordPair) =>
                wordPair.wordForeign.toUpperCase().includes(searchPattern.toUpperCase()) ||
                wordPair.wordNative.toUpperCase().includes(searchPattern.toUpperCase())
            );
        }

        return (
            <Fragment>
                {true && (
                    <Wordlist
                        wordPairs={wordPairsRevercedCopy}
                        checked={checked}
                        handleToggle={this.handleToggle}
                    />)}
                
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        wordPairs: store.wordlist.wordPairs,
        searchPattern: store.wordlist.searchPattern
    };
};

const mapDispatchToProps = dispatch => {
    return {
        pullWordPairs: () => dispatch(WordlistActions.pullWordPairs())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordlistPage);
