import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WordlistToolsBar extends Component {
    render() {
        return (
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-outline-primary"
                    onClick={this.props.handleClickSwitchAddMode}>
                    Добавить
                </button>
            </div>
        );
    }
}

WordlistToolsBar.propTypes = {
    handleClickSwitchAddMode: PropTypes.func.isRequired
};

export default WordlistToolsBar;
