import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'src/components/core/Icon';

function Stars({ score = 0, maxScore = 6, fontSize, ...rest }) {
  const actualScore = score >= 0 ? (score <= maxScore ? score : maxScore) : 0;

  return (
    <div {...rest}>
      {Array.apply(null, Array(parseInt(actualScore / 2))).map((_, index) => (
        <Icon key={index} color="gold" fontSize={fontSize}>
          star
        </Icon>
      ))}
      {actualScore % 2 !== 0 && (
        <Icon color="gold" fontSize={fontSize}>
          star_half
        </Icon>
      )}
      {Array.apply(null, Array(parseInt((maxScore - actualScore) / 2))).map(
        (_, index) => (
          <Icon key={index} color="gold" fontSize={fontSize}>
            star_border
          </Icon>
        )
      )}
    </div>
  );
}

Stars.propTypes = {
  score: PropTypes.number,
  maxScore: PropTypes.number,
  fontSize: PropTypes.string
};

export default Stars;
