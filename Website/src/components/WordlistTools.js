import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class WordlistTools extends Component {
    state = {
        addModeActivated: false,
        wordForeign: '',
        wordNative: ''
    };

    handleClickSwitchAddMode = () => {
        this.setState({
            addModeActivated: !this.state.addModeActivated
        });
    };

    handleChangeWordForeign = event => {
        this.setState({
            wordForeign: event.target.value
        });
    };

    handleChangeWordNative = event => {
        this.setState({
            wordNative: event.target.value
        });
    };

    handleClickAddWordPair = () => {
        const { wordForeign, wordNative } = this.state;

        if (wordForeign && wordNative) {
            const wordPair = JSON.stringify([{
                WordForeign: this.state.wordForeign,
                WordNative: this.state.wordNative
            }]);

            const { accessToken, addWordPair } = this.props;
            addWordPair(accessToken, wordPair);
        }

        this.setState({
            addModeActivated: false
        });
    };

    render() {
        const { addModeActivated } = this.state;

        const toolbar = <div className="btn-group" role="group">
            <button type="button" className="btn btn-outline-primary"
                onClick={this.handleClickSwitchAddMode}>
                Добавить
            </button>
        </div>;
        
        const wordPairInputField = <div className="input-group">
            <input type="text" className="form-control" placeholder="Слово или фраза"
                onChange={this.handleChangeWordForeign} />
            <input type="text" className="form-control" placeholder="Перевод"
                onChange={this.handleChangeWordNative} />
            <div className="input-group-append">
                <button type="button" className="btn btn-outline-primary"
                    onClick={this.handleClickAddWordPair}>
                    Сохранить
                </button>
                <button type="button" className="btn btn-outline-primary"
                    onClick={this.handleClickSwitchAddMode}>
                    Отменить
                </button>
            </div>
        </div>;

        return (
            <div className="navbar navbar-light bg-light mb-2 sticky-top">
                {!addModeActivated ?
                    toolbar :
                    wordPairInputField}
            </div>
        );
    }
}

WordlistTools.propTypes = {
    accessToken: PropTypes.string,
    addWordPair: PropTypes.func.isRequired
}
