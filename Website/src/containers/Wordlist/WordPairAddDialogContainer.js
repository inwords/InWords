import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../../actions/WordlistActions';
import WordPairEditDialog from '../../components/Wordlist/WordPairEditDialog';

class WordPairAddDialogContainer extends Component {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        addWordPair: PropTypes.func.isRequired
    };

    state = {
        wordForeign: '',
        wordNative: ''
    };

    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            if (this.props.open) {
                this.setState({
                    wordForeign: '',
                    wordNative: ''
                });
            }
        }
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleSubmit = event => {
        if (this.state.wordForeign && this.state.wordNative) {
            this.props.addWordPair({
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
        addWordPair: wordPair => dispatch(WordlistActions.addWordPair(wordPair))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(WordPairAddDialogContainer);
