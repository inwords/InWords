import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Search from './Search';

class WordlistToolsBar extends Component {
    render() {
        const { handleClickSwitchAddMode } = this.props;
        const { findWordPairs } = this.props;

        return (
            <div className="row">
                <div className="col">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-outline-primary" onClick={handleClickSwitchAddMode}>Добавить</button>
                    </div>
                </div>
                <div className="col-md-auto">
                    <Search searchAction={findWordPairs} />
                </div>
            </div>
        );
    }
}

WordlistToolsBar.propTypes = {
    handleClickSwitchAddMode: PropTypes.func.isRequired,
    findWordPairs: PropTypes.func.isRequired
};

export default WordlistToolsBar;
