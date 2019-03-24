import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../../actions/WordlistActions';
import WordPairEditing from '../../components/Wordlist/WordPairEditing';

class WordPairEditingContainer extends Component {
    static propTypes = {
        wordPair: PropTypes.object.isRequired,
        handleCancel: PropTypes.func.isRequired,
        editWordPair: PropTypes.func.isRequired
    };

    state = {
        wordForeign: this.props.wordPair.wordForeign,
        wordNative: this.props.wordPair.wordNative
    };

    handleChange = (propertyName) => (e) => {
        this.setState({
            [propertyName]: e.target.value
        });
    };

    handleSubmit = (e) => {
        const { wordForeign, wordNative } = this.state;

        if (wordForeign && wordNative) {
            this.props.editWordPair(this.props.wordPair.serverId, {
                WordForeign: wordForeign,
                WordNative: wordNative
            });
        }

        e.preventDefault();
    };

    render() {
        const { handleCancel } = this.props;
        const { wordForeign, wordNative } = this.state;

        return (
            <WordPairEditing
                wordForeign={wordForeign}
                wordNative={wordNative}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleCancel={handleCancel}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editWordPair: (pairId, wordPair) => dispatch(WordlistActions.editWordPair(pairId, wordPair))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(WordPairEditingContainer);
