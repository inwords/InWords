import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../../actions/WordlistActions';
import WordPairEditDialog from '../../components/Wordlist/WordPairEditDialog';

class WordPairEditDialogContainer extends Component {
    static propTypes = {
        wordPair: PropTypes.object.isRequired,
        open: PropTypes.bool.isRequired,
        editWordPair: PropTypes.func.isRequired
    };

    state = {
        wordForeign: this.props.wordPair.wordForeign,
        wordNative: this.props.wordPair.wordNative
    };

    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            if (this.props.open) {
                this.setState({
                    wordForeign: this.props.wordPair.wordForeign,
                    wordNative: this.props.wordPair.wordNative
                });
            }
        }
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleSubmit = event => {
        if (this.state.wordForeign && this.state.wordNative) {
            this.props.editWordPair({
                id: this.props.wordPair.serverId,
                WordForeign: this.state.wordForeign,
                WordNative: this.state.wordNative
            });
        }

        event.preventDefault();
    };

    render() {
        const { open, handleClose } = this.props;

        return (
            <WordPairEditDialog
                values={this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                open={open}
                handleClose={handleClose}
            />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editWordPair: wordPair => dispatch(WordlistActions.editWordPair(wordPair))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(WordPairEditDialogContainer);
