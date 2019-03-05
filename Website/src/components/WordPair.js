import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class WordPair extends Component {
    state = {
        editModeActivated: false,
        wordForeign: '',
        wordNative: ''
    };

    componentDidMount() {
        this.setState({
            wordForeign: this.props.wordForeign,
            wordNative: this.props.wordNative
        });
    }

    handleClickSwitchEditMode = () => {
        this.setState({
            editModeActivated: !this.state.editModeActivated
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

    handleClickEditWordPair = () => {
        const { wordForeign, wordNative } = this.state;

        if (wordForeign && wordNative) {
            const wordPair = JSON.stringify([{
                WordForeign: this.state.wordForeign,
                WordNative: this.state.wordNative
            }]);

            const { accessToken, id, editWordPair } = this.props;
            editWordPair(accessToken, JSON.stringify([id]), wordPair);
        }

        this.setState({
            editModeActivated: false
        });
    };

    handleClickDelWordPair = () => {
        const { accessToken, id, deleteWordPair } = this.props;

        deleteWordPair(accessToken, JSON.stringify([id]));
    };

    render() {
        const { editModeActivated } = this.state;

        const wordPairRow = <div className="row">
            <div className="col">
                <p className="font-weight-bold">
                    {this.props.wordForeign}
                </p>
            </div>
            <div className="col">
                {this.props.wordNative}
            </div>
            <div className="col-md-auto">
                <div className="btn-group btn-group-sm" role="group">
                    <button type="button" className="btn btn-outline-primary"
                        onClick={this.handleClickSwitchEditMode}>
                        Редактировать
                    </button>
                    <button type="button" className="btn btn-outline-danger"
                        onClick={this.handleClickDelWordPair}>
                        Удалить
                    </button>
                </div>
            </div>
        </div>

        const wordPairInputField = <div className="input-group">
            <input type="text" className="form-control" placeholder="Слово или фраза"
                value={this.state.wordForeign} onChange={this.handleChangeWordForeign} />
            <input type="text" className="form-control" placeholder="Перевод"
                value={this.state.wordNative} onChange={this.handleChangeWordNative} />
            <div className="input-group-append">
                <button type="button" className="btn btn-outline-primary"
                    onClick={this.handleClickEditWordPair}>
                    Сохранить
                </button>
                <button type="button" className="btn btn-outline-primary"
                    onClick={this.handleClickSwitchEditMode}>
                    Отменить
                </button>
            </div>
        </div>;

        return (
            <li className="list-group-item list-group-item-action">
                {!editModeActivated ?
                    wordPairRow :
                    wordPairInputField}
            </li>
        );
    }
}

WordPair.propTypes = {
    id: PropTypes.number.isRequired,
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired,
    accessToken: PropTypes.string,
    deleteWordPair: PropTypes.func.isRequired,
    editWordPair: PropTypes.func.isRequired
}
