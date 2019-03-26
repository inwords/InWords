import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../../actions/WordlistActions';
import WordlistToolbar from '../../components/Wordlist/WordlistToolbar';

class WordPairDialogAddContainer extends Component {
    static propTypes = {
        addWordPair: PropTypes.func.isRequired,
        handleCancel: PropTypes.func.isRequired
    };

    state = {
        wordForeign: '',
        wordNative: ''
    };

    handleChange = (propertyName) => (e) => {
        this.setState({
            [propertyName]: e.target.value
        });
    };

    handleSubmit = (e) => {
        const { wordForeign, wordNative } = this.state;

        if (wordForeign && wordNative) {
            this.props.addWordPair({
                WordForeign: wordForeign,
                WordNative: wordNative
            });
        }

        e.preventDefault();
    };

    render() {
        const { checked } = this.props;

        return (
            <WordlistToolbar
                delAvailable={checked.length}
                handleDelWordPairs={this.handleDelWordPairs}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addWordPair: (wordPair) => dispatch(WordlistActions.addWordPair(wordPair))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(WordPairDialogAddContainer);
