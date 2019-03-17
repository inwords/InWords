import React, { Component } from 'react';
import WordlistPairAdding from '../containers/WordlistPairAdding';
import WordlistPairsSearch from '../containers/WordlistPairsSearch';

class WordlistTools extends Component {
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
            <div className="bg-light p-2 mb-3">
                {!addModeActivated ?
                    <div className="row">
                        <div className="col">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-outline-primary"
                                    onClick={this.handleSwitchAddMode}>Добавить</button>
                            </div>
                        </div>
                        <div className="col-md-auto">
                            <WordlistPairsSearch />
                        </div>
                    </div> :
                    <WordlistPairAdding handleCancel={this.handleSwitchAddMode} />}
            </div>
        );
    }
}

export default WordlistTools;
