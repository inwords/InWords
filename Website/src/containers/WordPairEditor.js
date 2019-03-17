import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WordlistActions } from '../actions/WordlistActions';
import PropTypes from 'prop-types';

class WordPairEditor extends Component {
    static propTypes = {
        wordPair: PropTypes.object.isRequired,
        handleCancel: PropTypes.func.isRequired,
        editWordPair: PropTypes.func.isRequired
    };

    state = {
        wordForeign: "",
        wordNative: ""
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

    handleSubmit = (event) => {
        const { wordForeign, wordNative } = this.state;

        if (wordForeign && wordNative) {
            this.props.editWordPair(this.props.wordPair.serverId, {
                WordForeign: wordForeign,
                WordNative: wordNative
            });
        }

        event.preventDefault();
    };

    render() {
        const { handleCancel } = this.props;
        const { wordForeign, wordNative } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
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
                            <button type="submit" className="btn btn-primary">Сохранить</button>
                            <button type="button" className="btn btn-outline-primary"
                                onClick={handleCancel}>Отменить</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editWordPair: (pairId, wordPair) => dispatch(WordlistActions.editWordPair(pairId, wordPair))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(WordPairEditor);
