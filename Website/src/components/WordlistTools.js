import React, { Component } from 'react';
import WordlistPairAdding from '../containers/WordlistPairAdding';
import WordlistPairsSearch from '../containers/WordlistPairsSearch';

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
            <div className="bg-light p-2 mb-3">
                {!addModeActivated ?
                    <div className="row">
                        <div className="col">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-outline-primary"
                                    onClick={this.handleClickSwitchAddMode}>Добавить</button>
                            </div>
                        </div>
                        <div className="col-md-auto">
                            <WordlistPairsSearch />
                        </div>
                    </div> :
                    <WordlistPairAdding handleClickCancel={this.handleClickSwitchAddMode} />}
            </div>
        );
    }
}

export default WordlistTools;
