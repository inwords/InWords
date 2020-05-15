import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';

const emoticons = {
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
  ),
  1: (
    <Fragment>
      <circle r="30" cx="100" cy="130" fill="white" />
      <circle r="35" cx="170" cy="130" fill="white" />
      <circle r="10" cx="100" cy="132" fill="black" />
      <circle r="10" cx="167" cy="132" fill="black" />
      <ellipse
        rx="22"
        ry="18"
        cx="135"
        cy="210"
        fill="black"
        transform="rotate(5, 135, 210)"
      />
    </Fragment>
  ),
  2: (
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
  3: (
    <Fragment>
      <ellipse rx="30" ry="32" cx="100" cy="130" fill="white" />
      <ellipse rx="33" ry="36" cx="170" cy="130" fill="white" />
      <circle r="10" cx="100" cy="130" fill="black" />
      <circle r="10" cx="170" cy="130" fill="black" />
      <ellipse
        rx="20"
        ry="26"
        cx="135"
        cy="210"
        fill="black"
        transform="rotate(-1, 135, 210)"
      />
    </Fragment>
  ),
  4: (
    <Fragment>
      <ellipse rx="30" ry="34" cx="100" cy="130" fill="white" />
      <ellipse rx="33" ry="38" cx="170" cy="130" fill="white" />
      <circle r="10" cx="100" cy="127" fill="black" />
      <circle r="10" cx="170" cy="127" fill="black" />
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
  5: (
    <Fragment>
      <ellipse rx="30" ry="37" cx="100" cy="125" fill="white" />
      <ellipse rx="32" ry="41" cx="170" cy="125" fill="white" />
      <circle r="10" cx="100" cy="123" fill="black" />
      <circle r="10" cx="170" cy="123" fill="black" />
      <ellipse
        rx="20"
        ry="34"
        cx="135"
        cy="210"
        fill="black"
        transform="rotate(-1, 135, 210)"
      />
    </Fragment>
  ),
  6: (
    <Fragment>
      <ellipse rx="30" ry="40" cx="100" cy="120" fill="white" />
      <ellipse rx="30" ry="44" cx="170" cy="118" fill="white" />
      <circle r="10" cx="100" cy="115" fill="black" />
      <circle r="10" cx="170" cy="115" fill="black" />
      <ellipse
        rx="20"
        ry="38"
        cx="135"
        cy="210"
        fill="black"
        transform="rotate(-1, 135, 210)"
      />
    </Fragment>
  )
};

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

const getRandomColorPair = () =>
  colorPairs[Math.floor(Math.random() * colorPairs.length)];

function Smiley({ score }) {
  const colorPair = useMemo(() => getRandomColorPair(), []);
  const actualScore = score >= 0 ? (score <= 6 ? score : 6) : 0;

  return (
    <svg viewBox="0 0 300 300" width="150" height="150">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorPair[0]} />
          <stop offset="100%" stopColor={colorPair[1]} />
        </linearGradient>
      </defs>
      <circle r="120" cx="50%" cy="50%" fill="url(#gradient)" />
      {emoticons[actualScore]}
    </svg>
  );
}

Smiley.propTypes = {
  score: PropTypes.number.isRequired
};

export default Smiley;
