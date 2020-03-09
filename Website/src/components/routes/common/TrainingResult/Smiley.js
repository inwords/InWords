import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const emoticons = {
  3: (
    <Fragment>
      <ellipse rx="30" ry="40" cx="100" cy="120" fill="white" />
      <ellipse rx="30" ry="43" cx="170" cy="118" fill="white" />
      <circle r="10" cx="100" cy="115" fill="black" />
      <circle r="10" cx="170" cy="113" fill="black" />
      <ellipse
        rx="20"
        ry="38"
        cx="135"
        cy="210"
        fill="black"
        transform="rotate(-1, 135, 210)"
      />
    </Fragment>
  ),
  2: (
    <Fragment>
      <ellipse rx="30" ry="34" cx="100" cy="130" fill="white" />
      <ellipse rx="33" ry="38" cx="170" cy="130" fill="white" />
      <circle r="10" cx="100" cy="125" fill="black" />
      <circle r="10" cx="170" cy="125" fill="black" />
      <ellipse
        rx="20"
        ry="30"
        cx="135"
        cy="210"
        fill="black"
        transform="rotate(-1, 135, 210)"
      />
    </Fragment>
  ),
  1: (
    <Fragment>
      <circle r="30" cx="100" cy="130" fill="white" />
      <circle r="35" cx="170" cy="130" fill="white" />
      <circle r="10" cx="100" cy="130" fill="black" />
      <circle r="10" cx="170" cy="130" fill="black" />
      <ellipse
        rx="20"
        ry="22"
        cx="135"
        cy="210"
        fill="black"
        transform="rotate(-1, 135, 210)"
      />
    </Fragment>
  ),
  0: (
    <Fragment>
      <circle r="30" cx="100" cy="130" fill="white" />
      <circle r="35" cx="170" cy="130" fill="white" />
      <circle r="10" cx="100" cy="135" fill="black" />
      <circle r="10" cx="165" cy="135" fill="black" />
      <ellipse
        rx="25"
        ry="12"
        cx="135"
        cy="210"
        fill="black"
        transform="rotate(5, 135, 210)"
      />
    </Fragment>
  )
};

function Smiley({ score, colorPair }) {
  return (
    <svg viewBox="0 0 300 300" width="150" height="150">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorPair[0]} />
          <stop offset="100%" stopColor={colorPair[1]} />
        </linearGradient>
      </defs>
      <circle r="120" cx="50%" cy="50%" fill="url(#gradient)" />
      {emoticons[score]}
    </svg>
  );
}

Smiley.propTypes = {
  score: PropTypes.number.isRequired,
  colorPair: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Smiley;
