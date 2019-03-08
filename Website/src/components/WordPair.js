import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WordPairViewFragment from './WordPairViewFragment';
import WordPairEditFragment from './WordPairEditFragment';

class WordPair extends Component {
    state = {
        editModeActivated: false
    };

    handleClickSwitchEditMode = () => {
        this.setState({
            editModeActivated: !this.state.editModeActivated
        });
    };

    render() {
        const { wordPair } = this.props;
        const { editModeActivated } = this.state;

        return (
            <li className="list-group-item list-group-item-action">
                {!editModeActivated ?
                    <WordPairViewFragment
                        wordPair={wordPair}
                        handleClickSwitchEditMode={this.handleClickSwitchEditMode}
                        deleteWordPair={this.props.deleteWordPair} /> :
                    <WordPairEditFragment
                        wordPair={wordPair}
                        handleClickSwitchEditMode={this.handleClickSwitchEditMode}
                        editWordPair={this.props.editWordPair} />}
            </li>
        );
    }
}

WordPair.propTypes = {
    wordPair: PropTypes.object.isRequired,
    deleteWordPair: PropTypes.func.isRequired,
    editWordPair: PropTypes.func.isRequired
};

export default WordPair;
