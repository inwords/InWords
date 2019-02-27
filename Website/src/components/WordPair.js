import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class WordPair extends Component {
    render() {
        const { wordForeign, wordNative } = this.props;
        console.log(this.props);
        return (
            <li className="list-group-item list-group-item-action">
                <div className="row">
                    <div className="col-5">
                        <p className="font-weight-bold">{wordForeign}</p>
                    </div>
                    <div className="col-5">
                        {wordNative}
                    </div>
                    <div className="col">
                        <button type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}

WordPair.propTypes = {
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired
}
