import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WordlistActions } from '../actions/WordlistActions';
import PropTypes from 'prop-types';

class WordlistPairAdding extends Component {
    static propTypes = {
        addWordPair: PropTypes.func.isRequired,
        handleClickCancel: PropTypes.func.isRequired
    };

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

    handleSubmit = (event) => {
        const { wordForeign, wordNative } = this.state;

        if (wordForeign && wordNative) {
            this.props.addWordPair({
                WordForeign: wordForeign,
                WordNative: wordNative
            });

            this.setState({
                wordForeign: '',
                wordNative: ''
            });
        }

        event.preventDefault();
    };

    render() {
        const { handleClickCancel } = this.props;
        const { wordForeign, wordNative } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Слово или фраза"
                                value={wordForeign} onChange={this.handleChangeWordForeign} />
                            <input type="text" className="form-control" placeholder="Перевод"
                                value={wordNative} onChange={this.handleChangeWordNative} />
                        </div>
                    </div>
                    <div className="col-md-auto">
                        <div className="btn-group" role="group">
                            <button type="submit" className="btn btn-primary">Сохранить</button>
                            <button type="button" className="btn btn-outline-primary"
                                onClick={handleClickCancel}>Отменить</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addWordPair: (wordPair) => dispatch(WordlistActions.addWordPair(wordPair))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(WordlistPairAdding);
