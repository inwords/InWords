import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../../actions/WordlistActions';
import WordPairAdding from '../../components/Wordlist/WordlistPairAdding';

class WordlistPairAddingContainer extends Component {
    static propTypes = {
        wordPairs: PropTypes.array.isRequired,
        addWordPair: PropTypes.func.isRequired,
        handleCancel: PropTypes.func.isRequired
    };

    state = {
        wordForeign: '',
        wordNative: ''
    };

    componentDidUpdate(prevProps) {
        if (this.props.wordPairs !== prevProps.wordPairs) {
            this.setState({
                wordForeign: '',
                wordNative: ''
            });
        }
    }

    handleChange = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    };

    handleSubmit = (event) => {
        const { wordForeign, wordNative } = this.state;

        if (wordForeign && wordNative) {
            this.props.addWordPair({
                WordForeign: wordForeign,
                WordNative: wordNative
            });
        }

        event.preventDefault();
    };

    render() {
        const { handleCancel } = this.props;
        const { wordForeign, wordNative } = this.state;

        return (
            <WordPairAdding
                wordForeign={wordForeign}
                wordNative={wordNative}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleCancel={handleCancel}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        wordPairs: store.wordlist.wordPairs
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addWordPair: (wordPair) => dispatch(WordlistActions.addWordPair(wordPair))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordlistPairAddingContainer);
