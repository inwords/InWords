import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const colorPairs = [
  ['#F44336', '#FFCDD2'],
  ['#E91E63', '#F8BBD0'],
  ['#9C27B0', '#E1BEE7'],
  ['#673AB7', '#D1C4E9'],
  ['#3F51B5', '#C5CAE9'],
  ['#2196F3', '#BBDEFB'],
  ['#03A9F4', '#B3E5FC'],
  ['#00BCD4', '#B2EBF2'],
  ['#009688', '#B2DFDB'],
  ['#4CAF50', '#C8E6C9'],
  ['#8BC34A', '#DCEDC8'],
  ['#CDDC39', '#F0F4C3'],
  ['#FFC107', '#FFECB3'],
  ['#FF9800', '#FFE0B2'],
  ['#FF5722', '#FFCCBC']
];

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

function Smiley({ score }) {
  const randomColorPair =
    colorPairs[Math.floor(Math.random() * colorPairs.length)];

  return (
    <svg viewBox="0 0 300 300" width="150" height="150">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={randomColorPair[0]} />
          <stop offset="100%" stopColor={randomColorPair[1]} />
        </linearGradient>
      </defs>
      <circle r="120" cx="50%" cy="50%" fill="url(#gradient)" />
      {emoticons[score]}
    </svg>
  );
}

Smiley.propTypes = {
  score: PropTypes.number.isRequired
};

export default Smiley;
