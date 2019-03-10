import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WordPairView from './WordPairView';
import WordPairEditor from './WordPairEditor';

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
                    <WordPairView
                        wordPair={wordPair}
                        handleClickSwitchEditMode={this.handleClickSwitchEditMode}
                        deleteWordPair={this.props.deleteWordPair}
                    /> :
                    <WordPairEditor
                        wordPair={wordPair}
                        handleClickSwitchEditMode={this.handleClickSwitchEditMode}
                        editWordPair={this.props.editWordPair}
                    />
                }
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
