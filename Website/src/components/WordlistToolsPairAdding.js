import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WordlistToolsPairAdding extends Component {
    state = {
        wordForeign: '',
        wordNative: ''
    };

    handleChangeWordForeign = (event) => {
        this.setState({
            wordForeign: event.target.value
        });
    };

    handleChangeWordNative = (event) => {
        this.setState({
            wordNative: event.target.value
        });
    };

    handleClickAddWordPair = () => {
        const { wordForeign, wordNative } = this.state;

        if (wordForeign && wordNative) {
            this.props.addWordPair({
                WordForeign: wordForeign,
                WordNative: wordNative
            });
        }
    };

    render() {
        const { handleClickSwitchAddMode } = this.props;

        return (
            <div className="row">
                <div className="col">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Слово или фраза" onChange={this.handleChangeWordForeign} />
                        <input type="text" className="form-control" placeholder="Перевод" onChange={this.handleChangeWordNative} />
                    </div>
                </div>
                <div className="col-md-auto">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-primary" onClick={this.handleClickAddWordPair}>Сохранить</button>
                        <button type="button" className="btn btn-outline-primary" onClick={handleClickSwitchAddMode}>Отменить</button>
                    </div>
                </div>
            </div>
        );
    }
}

WordlistToolsPairAdding.propTypes = {
    addWordPair: PropTypes.func.isRequired,
    handleClickSwitchAddMode: PropTypes.func.isRequired
};

export default WordlistToolsPairAdding;
