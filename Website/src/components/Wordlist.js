import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WordPair } from './WordPair';

export class Wordlist extends Component {
    componentDidMount() {
        const { token, pullwordpairs } = this.props;
        pullwordpairs(token);
    }

    render() {
        console.log(this.props.wordPairs)
        const wordPairs = this.props.wordPairs.map((pair) =>
            <WordPair key={pair.serverId}
                wordForeign={pair.wordForeign} wordNative={pair.wordNative} />);
        return (
            <div>
                <div className="form-group sticky-top">
                    <nav className="navbar navbar-light bg-light">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-outline-primary">Редактировать</button>
                            <button type="button" className="btn btn-outline-primary">Удалить</button>
                            <button type="button" className="btn btn-outline-primary">Изменить</button>
                            <button type="button" className="btn btn-outline-primary">Добавить</button>
                        </div>
                    </nav>
                </div>
                <ul className="list-group list-group-flush">
                    {wordPairs}
                </ul>
            </div>
        );
    }
}

Wordlist.propTypes = {
    token: PropTypes.string.isRequired,
    wordPairs: PropTypes.array.isRequired,
    pullwordpairs: PropTypes.func.isRequired
}
