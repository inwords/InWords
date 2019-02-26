import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class WordPair extends Component {
    render() {
        const { wordForeign, wordNative } = this.props;
        return (
            <li className="list-group-item list-group-item-action">
                <div className="row">
                    <div className="col">
                        <p className="font-weight-bold">{wordForeign}</p>
                    </div>
                    <div className="col">{wordNative}</div>
                </div>
            </li>
        );
    }
}

WordPair.propTypes = {
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired
}
