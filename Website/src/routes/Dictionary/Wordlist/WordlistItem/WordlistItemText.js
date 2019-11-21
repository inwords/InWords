import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const WordlistItemTextRoot = styled.div`
  flex: 1 1 auto;
  margin-top: 6px;
  margin-bottom: 6px;
`;

const WordlistItemTextPrimary = styled.span`
  ${props => props.theme.typography.body2}
  color: ${props => props.theme.palette.text.primary};
`;

const WordlistItemTextSecondary = styled.span`
  display: block;
  ${props => props.theme.typography.body2}
  color: ${props => props.theme.palette.text.secondary};
`;

function WordlistItemText({ primary, secondary, ...rest }) {
  return (
    <WordlistItemTextRoot {...rest}>
      <WordlistItemTextPrimary>{primary}</WordlistItemTextPrimary>
      <WordlistItemTextSecondary>{secondary}</WordlistItemTextSecondary>
    </WordlistItemTextRoot>
  );
}

WordlistItemText.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string
};

export default React.memo(WordlistItemText);
