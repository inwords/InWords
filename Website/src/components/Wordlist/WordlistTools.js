import React from 'react';
import PropTypes from 'prop-types';
import WordlistPairsSearchContainer from '../../containers/Wordlist/WordlistPairsSearchContainer';

function WordlistTools({ handleSwitchAddMode }) {
    return (
        <div className="row">
            <div className="col">
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-outline-primary"
                        onClick={handleSwitchAddMode}>Добавить</button>
                </div>
            </div>
            <div className="col-md-auto">
                <WordlistPairsSearchContainer />
            </div>
        </div>
    );
}

WordlistTools.propTypes = {
    handleSwitchAddMode: PropTypes.func.isRequired
};

export default WordlistTools;
