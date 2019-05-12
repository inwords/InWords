import React from 'react';
import PropTypes from 'prop-types';

const emoticons = {
    3:
        <>
            <circle r="120" cx="50%" cy="50%" fill="gold" />
            <ellipse rx="30" ry="40" cx="100" cy="120" fill="white" />
            <ellipse rx="30" ry="43" cx="170" cy="118" fill="white" />
            <circle r="10" cx="100" cy="115" fill="black" />
            <circle r="10" cx="170" cy="113" fill="black" />
            <ellipse rx="20" ry="38" cx="135" cy="210" fill="black" transform='rotate(-1, 135, 210)' />
        </>,
    2:
        <>
            <circle r="120" cx="50%" cy="50%" fill="gold" />
            <ellipse rx="30" ry="34" cx="100" cy="130" fill="white" />
            <ellipse rx="33" ry="38" cx="170" cy="130" fill="white" />
            <circle r="10" cx="100" cy="125" fill="black" />
            <circle r="10" cx="170" cy="125" fill="black" />
            <ellipse rx="20" ry="30" cx="135" cy="210" fill="black" transform='rotate(-1, 135, 210)' />
        </>,
    1:
        <>
            <circle r="120" cx="50%" cy="50%" fill="gold" />
            <circle r="30" cx="100" cy="130" fill="white" />
            <circle r="35" cx="170" cy="130" fill="white" />
            <circle r="10" cx="100" cy="130" fill="black" />
            <circle r="10" cx="170" cy="130" fill="black" />
            <ellipse rx="20" ry="22" cx="135" cy="210" fill="black" transform='rotate(-1, 135, 210)' />
        </>,
    0:
        <>
            <circle r="120" cx="50%" cy="50%" fill="gold" />
            <circle r="30" cx="100" cy="130" fill="white" />
            <circle r="35" cx="170" cy="130" fill="white" />
            <circle r="10" cx="100" cy="135" fill="black" />
            <circle r="10" cx="165" cy="135" fill="black" />
            <ellipse rx="25" ry="12" cx="135" cy="210" fill="black" transform='rotate(5, 135, 210)' />
        </>
}

function Smiley({ score }) {
    return (
        <svg viewBox="0 0 300 300" width="130" height="130">
            {emoticons[score]}
        </svg>
    )
}

Smiley.propTypes = {
    score: PropTypes.number.isRequired,
};

export default Smiley;
