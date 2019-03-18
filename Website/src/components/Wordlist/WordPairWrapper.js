import React from 'react';

function WordPairWrapper({ children }) {
    return (
        <li className="list-group-item list-group-item-action">
            {children}
        </li>
    );
}

export default WordPairWrapper;
