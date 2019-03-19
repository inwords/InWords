import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WordPairViewContainer from '../Wordlist/WordPairViewContainer';
import WordPairEditingContainer from './WordPairEditingContainer';

class WordPairContainer extends Component {
    static propTypes = {
        wordPair: PropTypes.object.isRequired
    };

    state = {
        editModeActivated: false
    };

    handleSwitchEditMode = () => {
        this.setState({
            editModeActivated: !this.state.editModeActivated
        });
    };

    render() {
        const { wordPair } = this.props;
        const { editModeActivated } = this.state;

        return (
            !editModeActivated ?
                <WordPairViewContainer
                    wordPair={wordPair}
                    handleSwitchEditMode={this.handleSwitchEditMode}
                /> :
                <WordPairEditingContainer
                    wordPair={wordPair}
                    handleCancel={this.handleSwitchEditMode}
                />
        );
    }
}

export default WordPairContainer;
