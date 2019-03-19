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
        wordForeign: '',
        wordNative: ''
    };

    componentDidMount() {
        const { wordPair } = this.props;

        this.setState({
            wordForeign: wordPair.wordForeign,
            wordNative: wordPair.wordNative
        });
    }

    handleChange = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    };

    handleSubmit = (event) => {
        const { wordForeign, wordNative } = this.state;

        if (wordForeign && wordNative) {
            this.props.editWordPair(this.props.wordPair.serverId, {
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
