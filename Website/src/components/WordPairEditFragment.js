import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WordPairEditFragment extends Component {
    state = {
        wordForeign: '',
        wordNative: ''
    };

    componentDidMount() {
        const { wordPair } = this.props;

        this.setState({
            wordForeign: wordPair.wordForeign,
            wordNative: wordPair.wordNative
        });
    }

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

    handleClickEditWordPair = () => {
        const { wordForeign, wordNative } = this.state;

        if (wordForeign && wordNative) {
            this.props.editWordPair(this.props.wordPair.serverId, {
                WordForeign: wordForeign,
                WordNative: wordNative
            });
        }
    };

    render() {
        const { wordForeign, wordNative } = this.state;

        return (
            <div className="row">
                <div className="col">
                    <div className="input-group input-group-sm">
                        <input type="text" className="form-control" placeholder="Слово или фраза"
                            value={wordForeign} onChange={this.handleChangeWordForeign} />
                        <input type="text" className="form-control" placeholder="Перевод"
                            value={wordNative} onChange={this.handleChangeWordNative} />
                    </div>
                </div>
                <div className="col-md-auto">
                    <div className="btn-group btn-group-sm" role="group">
                        <button type="button" className="btn btn-primary"
                            onClick={this.handleClickEditWordPair}>
                            Сохранить
                        </button>
                        <button type="button" className="btn btn-outline-primary"
                            onClick={this.props.handleClickSwitchEditMode}>
                            Отменить
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

WordPairEditFragment.propTypes = {
    wordPair: PropTypes.object.isRequired,
    handleClickSwitchEditMode: PropTypes.func.isRequired,
    editWordPair: PropTypes.func.isRequired
};

export default WordPairEditFragment;
