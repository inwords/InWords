import React from 'react';
import PropTypes from 'prop-types';

function WordlistToolsBar ({ handleClickSwitchAddMode }) {
    return <div className="btn-group" role="group">
        <button type="button" className="btn btn-outline-primary" onClick={handleClickSwitchAddMode}>Добавить</button>
    </div>;
};

WordlistToolsBar.propTypes = {
    handleClickSwitchAddMode: PropTypes.func.isRequired
};

export default WordlistToolsBar;
