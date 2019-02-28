import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class WordPair extends Component {
    handleDelWordPairs = () => {
        const { token, id } = this.props;
        this.props.deleteWordPairs(token, JSON.stringify(Array('' + id)));
    }

    render() {
        return (
            <li className="list-group-item list-group-item-action">
                <div className="row">
                    <div className="col-5">
                        <p className="font-weight-bold">
                            {this.props.wordForeign}
                        </p>
                    </div>
                    <div className="col-5">
                        {this.props.wordNative}
                    </div>
                    <div className="col">
                        <button type="button" className="close" aria-label="Close"
                            onClick={this.handleDelWordPairs}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}

WordPair.propTypes = {
    id: PropTypes.number.isRequired,
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    deleteWordPairs: PropTypes.func.isRequired
}
