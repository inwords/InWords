import React from 'react';

function WordlistWrapper({ children }) {
    return (
        <ul className="list-group list-group-flush">
            {children}
        </ul>
    );
}

export default WordlistWrapper;
