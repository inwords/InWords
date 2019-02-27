import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WordPair } from './WordPair';

export class Wordlist extends Component {
    componentDidMount() {
        const { token } = this.props;
        this.props.pullWordPairs(token);
    }

    render() {
        const { pairs, error } = this.props;
        const wordPairs = pairs.map((pair, index) =>
            <WordPair key={index} id={pair.serverId}
                wordForeign={pair.wordForeign} wordNative={pair.wordNative} />);
        const errorMessage = error ?
            <div className="alert alert-danger" role="alert">{error}</div> :
            <div />;
        return (
            <div>
                <div className="form-group sticky-top">
                    <nav className="navbar navbar-light bg-light">
                        <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-outline-primary btn">Добавить</button>
                        </div>
                    </nav>
                </div>
                {errorMessage}
                <ul className="list-group list-group-flush">
                    {wordPairs}
                </ul>
            </div>
        );
    }
}

Wordlist.propTypes = {
    token: PropTypes.string.isRequired,
    pairs: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
    pullWordPairs: PropTypes.func.isRequired
}
