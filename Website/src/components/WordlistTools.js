import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WordlistToolsBar from './WordlistToolsBar';
import  WordlistToolsPairAdding from './WordlistToolsPairAdding';

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
        const { addWordPair, findWordPairs } = this.props;
        const { addModeActivated } = this.state;

        return (
            <div className="container bg-light pb-2 pt-2 mb-3">
                {!addModeActivated ?
                    <WordlistToolsBar
                        handleClickSwitchAddMode={this.handleClickSwitchAddMode}
                        findWordPairs={findWordPairs}
                    /> :
                    < WordlistToolsPairAdding
                        handleClickSwitchAddMode={this.handleClickSwitchAddMode}
                        addWordPair={addWordPair}
                    />}
            </div>
        );
    }
}

WordlistTools.propTypes = {
    addWordPair: PropTypes.func.isRequired,
    findWordPairs: PropTypes.func.isRequired
};

export default WordlistTools;
