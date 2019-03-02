import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class WordPair extends Component {
    handleDelWordPair = () => {
        const { accessToken, id, deleteWordPair } = this.props;

        deleteWordPair(accessToken, id);
    };

    render() {
        const { wordForeign, wordNative } = this.props;

        return (
            <li className="list-group-item list-group-item-action">
                <div className="row">
                    <div className="col">
                        <p className="font-weight-bold">
                            {wordForeign}
                        </p>
                    </div>
                    <div className="col">
                        {wordNative}
                    </div>
                    <div className="col-md-auto">
                        <div className="btn-group btn-group-sm" role="group">
                            <button type="button" className="btn btn-outline-primary">
                                Редактировать
                            </button>
                            <button type="button" className="btn btn-outline-danger"
                                onClick={this.handleDelWordPair}>
                                Удалить
                            </button>
                        </div>
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
    accessToken: PropTypes.string,
    deleteWordPair: PropTypes.func.isRequired
}
