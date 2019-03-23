import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function WordPairView({ wordPair }) {
    return (
        <Fragment>
            <div className="col">
                <strong>{wordPair.wordForeign}</strong>
            </div>
            <div className="col">
                {wordPair.wordNative}
            </div>
        </Fragment>
    );
}

WordPairView.propTypes = {
    wordPair: PropTypes.object.isRequired
};

export default WordPairView;