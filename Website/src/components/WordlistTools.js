import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WordlistToolsBar from './WordlistToolsBar';
import WordlistToolsAddFragment from './WordlistToolsAddFragment';

class WordlistTools extends Component {
    state = {
        addModeActivated: false,
    };

    handleClickSwitchAddMode = () => {
        this.setState({
            addModeActivated: !this.state.addModeActivated
        });
    };

    render() {
        const { addModeActivated } = this.state;

        return (
            <div className="container bg-light mb-3 pb-2 pt-2">
                {!addModeActivated ?
                    <WordlistToolsBar
                        handleClickSwitchAddMode={this.handleClickSwitchAddMode} /> :
                    <WordlistToolsAddFragment
                        handleClickSwitchAddMode={this.handleClickSwitchAddMode}
                        addWordPair={this.props.addWordPair} />}
            </div>
        );
    }
}

WordlistTools.propTypes = {
    addWordPair: PropTypes.func.isRequired
};

export default WordlistTools;
