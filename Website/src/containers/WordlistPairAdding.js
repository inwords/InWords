import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WordlistActions } from '../actions/WordlistActions';
import PropTypes from 'prop-types';

class WordlistPairAdding extends Component {
    static propTypes = {
        wordPairs: PropTypes.array.isRequired,
        addWordPair: PropTypes.func.isRequired,
        handleCancel: PropTypes.func.isRequired
    };

    state = {
        wordForeign: "",
        wordNative: ""
    };

    componentDidUpdate(prevProps) {
        if (this.props.wordPairs !== prevProps.wordPairs) {
            this.setState({
                wordForeign: "",
                wordNative: ""
            });
        }
    }

    handleChange = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    };

    handleSubmit = (event) => {
        const { wordForeign, wordNative } = this.state;

        if (wordForeign && wordNative) {
            this.props.addWordPair({
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
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Слово или фраза"
                                value={wordForeign} onChange={this.handleChange("wordForeign")} />
                            <input type="text" className="form-control" placeholder="Перевод"
                                value={wordNative} onChange={this.handleChange("wordNative")} />
                        </div>
                    </div>
                    <div className="col-md-auto">
                        <div className="btn-group" role="group">
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

const mapStateToProps = (store) => {
    return {
        wordPairs: store.wordlist.wordPairs
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addWordPair: (wordPair) => dispatch(WordlistActions.addWordPair(wordPair))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordlistPairAdding);
