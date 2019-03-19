import React, { Component } from 'react';
import WordlistTools from '../../components/Wordlist/WordlistTools';
import WordlistPairAddingContainer from './WordlistPairAddingContainer';

class WordlistToolsContainer extends Component {
    state = {
        addModeActivated: false,
    };

    handleSwitchAddMode = () => {
        this.setState({
            addModeActivated: !this.state.addModeActivated
        });
    };

    render() {
        const { addModeActivated } = this.state;

        return (
            !addModeActivated ?
                <WordlistTools handleSwitchAddMode={this.handleSwitchAddMode} /> :
                <WordlistPairAddingContainer handleCancel={this.handleSwitchAddMode} />
        );
    }
}

export default WordlistToolsContainer;
