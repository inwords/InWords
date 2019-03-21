import React from 'react';
import PropTypes from 'prop-types';

function LiveSearch({ query, handleChange }) {
    return (
        <form className="form-inline">
            <input type="search" className="form-control" placeholder="Поиск слов"
                value={query} onChange={handleChange} />
        </form>
    );
}

LiveSearch.propTypes = {
    query: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default LiveSearch;
