import React from 'react';
import PropTypes from 'prop-types';

function GamesInfoTools({ handleSwitchAddMode }) {
    return (
        <div className="p-2 mb-3">
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-outline-primary"
                    onClick={handleSwitchAddMode}>Создать игру</button>
            </div>
        </div>
    );
}

GamesInfoTools.propTypes = {
    handleSwitchAddMode: PropTypes.func.isRequired
};

export default GamesInfoTools;
