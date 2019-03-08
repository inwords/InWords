import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WordPairViewFragment extends Component {
    handleClickDelWordPair = () => {
        this.props.deleteWordPair(this.props.wordPair.serverId);
    };

    render() {
        const { wordPair } = this.props;

        return (
            <div className="row">
                <div className="col">
                    <strong>{wordPair.wordForeign}</strong>
                </div>
                <div className="col">
                    {wordPair.wordNative}
                </div>
                <div className="col-md-auto">
                    <div className="btn-group btn-group-sm" role="group">
                        <button type="button" className="btn btn-outline-primary"
                            onClick={this.props.handleClickSwitchEditMode}>
                            Редактировать
                        </button>
                        <button type="button" className="btn btn-outline-danger"
                            onClick={this.handleClickDelWordPair}>
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

WordPairViewFragment.propTypes = {
    wordPair: PropTypes.object.isRequired,
    handleClickSwitchEditMode: PropTypes.func.isRequired,
    deleteWordPair: PropTypes.func.isRequired
};

export default WordPairViewFragment;
